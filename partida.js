import React, {Component} from 'react';
import {View, ListView, Text, AsyncStorage} from 'react-native';
import MyButton from './src/js/MyButton';

const Cabecera = require('./src/js/Cabecera');
const Tablero = require('./src/js/Tablero');
const historico = [" "];

const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});

var PartidaScene = React.createClass({
    getInitialState: function () {
        return {
            valores: this.props.valores,
            dataSource: ds
        };
    },

    componentDidMount: function () {
        dataSource = ds.cloneWithRows(historico);
        this.setState({dataSource: dataSource});
    },

    _saveData: async function (key, value) {
        try {
            console.log("intento guardar");
            await AsyncStorage.setItem(key,value);
        } catch (error) {
            console.log(error);
            // Error saving data
        }
    },

    _loadData: async function(key){
        console.log("_loadData");
        try {
            var aux = [];
            let value = await AsyncStorage.getItem(key);
            console.log(value);
            for (var i=0; i < 3; i++){
                var str = value.substr(6*i, 5);
                aux.push(str.split(','));
            }
            console.log(aux);
            return aux;
        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
    },

    save: async function() {
        console.log('save');
        this._saveData("valores", ""+this.props.valores);
    },

    load: async function () {
        console.log('load');
        var aux = this._loadData("valores");
        this.setState({
            valores: this.state.valores = await aux
        });
        console.log(this.state.valores);
    },

    reset: function () {
        this.props.reset();
        historico = [" "];
        dataSource = ds.cloneWithRows(historico);
        this.setState({dataSource: dataSource});
    },

    clickUpdate: function (numeroFila, numeroColumna) {
        historico.push(this.props.turno + " seleccionó la casilla ["+numeroFila+"]["+numeroColumna+"]");
        console.log(historico);
        dataSource = ds.cloneWithRows(historico);

        this.setState({dataSource: dataSource});

        this.props.manejadorTableroClick(numeroFila, numeroColumna);
    },

    _renderRow: function (rowData) {
        return(
            <View>
                <Text>{rowData}</Text>
            </View>
        )
    },

    render:function(){
        return (
            <View style = {{flex: 1, margin: 10, flexDirection: 'column'}}>
                <Cabecera texto = {this.props.turno}/>
                <Tablero style = {{flex: 1}} valores = {this.state.valores} manejadorTableroClick={this.clickUpdate}/>
                <ListView style = {{flex: 4}} dataSource={this.state.dataSource} renderRow={this._renderRow} />
                <View style = {{flexDirection: 'column', justifyContent: 'space-around'}}>
                    <View style = {{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <MyButton onPress = {this.props.onBack} text = {"Volver"}/>
                        <MyButton onPress = {this.reset} text = {"Reiniciar"}/>

                    </View>
                    <View style = {{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <MyButton onPress = {this.load} text = {"Cargar"}/>
                        <MyButton onPress = {this.save} text = {"Guardar"}/>
                    </View>
                </View>
            </View>
        )
    }
});

export default PartidaScene;

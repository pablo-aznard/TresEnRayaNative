import React, {Component} from 'react';
import {View, ListView, Text} from 'react-native';
import MyButton from './src/js/MyButton';

const Cabecera = require('./src/js/Cabecera');
const Tablero = require('./src/js/Tablero');
const historico = [" "];

const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});

var PartidaScene = React.createClass({
    getInitialState: function () {
        return {dataSource: ds};
    },

    componentDidMount: function () {
        dataSource = ds.cloneWithRows(historico);
        this.setState({dataSource: dataSource});
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
                <Tablero style = {{flex: 1}} valores = {this.props.valores} manejadorTableroClick={this.clickUpdate}/>
                <ListView style = {{flex: 4}} dataSource={this.state.dataSource} renderRow={this._renderRow} />
                <View style = {{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <MyButton onPress = {this.props.onBack} text = {"Volver"}/>
                    <MyButton onPress = {this.reset} text = {"Reiniciar"}/>
                </View>
            </View>
        )
    }
});

export default PartidaScene;

import React, {Component} from 'react';
import {View, ListView, Text, AsyncStorage} from 'react-native';
import MyButton from './src/js/MyButton';

const Cabecera = require('./src/js/Cabecera');
const Tablero = require('./src/js/Tablero');
const historico = [];

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
					let value = await AsyncStorage.getItem(key);
					console.log(value);
					return value.split(",");
  			} catch (error) {
  					console.log(error);
  			}
  	},

  	save: async function() {
  			console.log('save');
  			this._saveData("historico", ""+historico);

        this.props.save();
  	},

  	load: async function () {
  			console.log('load');
  			historico = this._loadData("historico");
<<<<<<< HEAD
=======
        // historico = Object.values(historico);
>>>>>>> e38e5f9c86f3907b9b5a178cbbbfc6e94a3dbbf1
        historico = Object.values(await historico);
        console.log(await historico);
        dataSource = await ds.cloneWithRows(historico);
  			this.setState({
  					dataSource: this.state.dataSource = await dataSource
  			});

        this.props.load();
  	},

    reset: function () {
        this.props.reset();
        historico = [" "];
        dataSource = ds.cloneWithRows(historico);
        this.setState({dataSource: dataSource});
    },

    clickUpdate: function (numeroFila, numeroColumna) {
        historico.push(this.props.turno + " seleccionó la casilla ["+numeroFila+"]["+numeroColumna+"]");
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
        console.log("partida.js render");
        return (
            <View style = {{flex: 1, margin: 10, flexDirection: 'column'}}>
                <Cabecera texto = {this.props.turno}/>
                <Tablero style = {{flex: 1}} valores = {this.props.valores} manejadorTableroClick={this.clickUpdate}/>
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

import React, {Component} from 'react';
import {View, ListView, Text} from 'react-native';
import MyButton from './src/js/MyButton';

const Cabecera = require('./src/js/Cabecera');
const Tablero = require('./src/js/Tablero');
var app = require('./src/js/App');

const JugadorX = "jugador 1 - las X";
const Jugador0 = "jugador 2 - los 0";
const VALORES = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
var fin = 0;

var PartidaScene = React.createClass({
    getInitialState: function () {
        const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
        this.setState({dataSource: ds.cloneWithRows(this.props.hist)});
        return {dataSource: ds.cloneWithRows(this.props.hist)};
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
            <View style = {{flex: 1, margin: 10}}>
                <Cabecera texto = {this.props.turno}/>
                <Tablero valores = {this.props.valores} manejadorTableroClick={this.props.manejadorTableroClick}/>
                <ListView dataSource={this.state.dataSource} renderRow={this._renderRow} />
                <MyButton onPress = {this.props.onBack} text = {"Volver"}/>
            </View>
        )
    }
});

export default PartidaScene;

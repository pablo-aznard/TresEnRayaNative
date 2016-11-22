import React, {Component} from 'react';
import {View} from 'react-native';
import MyButton from './src/js/MyButton';

const Cabecera = require('./src/js/Cabecera');
const Tablero = require('./src/js/Tablero');
var app = require('./src/js/App');

const JugadorX = "jugador 1 - las X";
const Jugador0 = "jugador 2 - los 0";
const VALORES = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
var fin = 0;

var PartidaScene = React.createClass({

    render:function(){
        return (
            <View style = {{flex: 1, margin: 10}}>
                <Cabecera texto = {this.props.turno}/>
                <Tablero valores = {this.props.valores} manejadorTableroClick={this.props.manejadorTableroClick}/>
                <MyButton onPress = {this.props.onBack} text = {"Volver"} />
            </View>
        )
    }
});

export default PartidaScene;

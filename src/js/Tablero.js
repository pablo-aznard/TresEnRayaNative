import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

var Casilla = require("./Casilla");

const styles = StyleSheet.create({
	tablero:{
		flex:1,
		flexDirection:'column',
		justifyContent:'space-between'
	},
	fila: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});

var Tablero = React.createClass({
	tableroClick: function (numeroFila, numeroColumna){
		this.props.manejadorTableroClick(numeroFila, numeroColumna);
	},
	render: function(){
		let tablero = this.props.valores.map(function(valoresFila, indiceFila) {
			let fila = valoresFila.map(function(valor, indiceColumna){
				let mykey = "" + indiceFila + indiceColumna;
				return (<Casilla valor ={valor} indiceFila={indiceFila}
					indiceColumna={indiceColumna} key={mykey} manejadorClick={this.tableroClick} />
				)
			}, this);
			return(
				<View key={"fila"+indiceFila} style={styles.fila}>{fila}</View>
			)
		}, this);
		return (
			<View style={styles.tablero}>
				{tablero}
			</View>
		);
	}
});

module.exports = Tablero;

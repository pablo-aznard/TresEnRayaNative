import React, {Component} from 'react';
import {Navigator} from 'react-native';

import IndexScene from '../../inicio';
import PartidaScene from '../../partida';

const Cabecera = require('./Cabecera');
const Tablero = require('./Tablero');

const JugadorX = "jugador 1 - las X";
const Jugador0 = "jugador 2 - los 0";
const VALORES = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
const historico = [];
var fin = 0;

var App = React.createClass({
	getInitialState: function(){
		return{
			turno: JugadorX,
			valores: VALORES,
			historico: historico,
			fin: fin
		};
	},

	//
	// componentDidMount(){
	// 	TresEnRayaStore.addChangeListener(this._onChange);
	// },
	//
	// componentWillUnmount(){
	// 	TresEnRayaStore.removeChangeListener(this._onChange);
	// },
	//
	// _onChange: function(){
	// 	var newState = TresEnRayaStore.getState();
	// 	this.setState(newState);
	// },

	showAlert:function(){
		if (fin == 1)
			alert(this.state.turno+" ha ganado!");
	},

	winner: function () {
		let valores = this.state.valores;
		var win = false;
		var a=0,b=0,c=0,d=0,e=0,f=0,g=0,h=0;
		// El 0 gana con +3 y la X gana con -3
		for (var i = 0; i < 3; i++) {
			if (valores[0][i] !== '-') a += (valores[0][i] === "0") ? 1 : -1;
			if (valores[1][i] !== '-') b += (valores[1][i] === "0") ? 1 : -1;
			if (valores[2][i] !== '-') c += (valores[2][i] === "0") ? 1 : -1;
			if (valores[i][0] !== '-') d += (valores[i][0] === "0") ? 1 : -1;
			if (valores[i][1] !== '-') e += (valores[i][1] === "0") ? 1 : -1;
			if (valores[i][2] !== '-') f += (valores[i][2] === "0") ? 1 : -1;
			if (valores[i][i] !== '-') g += (valores[i][i] === "0") ? 1 : -1;
			if (valores[2-i][i] !== '-') h += (valores[2-i][i] === "0") ? 1 : -1;
		}
		if (Math.abs(a) === 3 || Math.abs(b) === 3 || Math.abs(c) === 3 || Math.abs(d) === 3
		 || Math.abs(e) === 3 || Math.abs(f) === 3 || Math.abs(g) === 3 || Math.abs(h) === 3){
			 return true;
		}
		return false;
	},

	reset: function(){
		this.setState({
			turno: this.state.turno = JugadorX,
			valores: this.state.valores = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']],
			historico: this.state.historico = [],
			fin: fin = 0
		});
	},

	appClick: function (numeroFila, numeroColumna){
		if (fin < 1) {
			let valores = this.state.valores;
			let nuevoValor = this.state.turno === JugadorX ? 'X' : '0';
			let hist = this.state.historico;
			valores[numeroFila][numeroColumna] = nuevoValor;
			hist.push(nuevoValor + " seleccionó la casilla ["+numeroFila+"]["+numeroColumna+"]");
			//cada vez que se hace un setState se ejecuta el render
			this.setState({
				turno: this.state.turno === JugadorX ? Jugador0 : JugadorX,
				valores: this.state.valores,
				historico: hist
			});

			if (this.winner()) {
				fin += 1;
				this.showAlert();
			}
		}
	},


	render: function(){
		// var texto = "Turno del " +this.state.turno;
		// return (
		// 	<View style={{flex: 1, margin: 10}}>
		// 		<Cabecera texto={texto}/>
		// 		<Tablero valores={this.state.valores}
		// 			manejadorTableroClick={this.appClick}/>
		// 	</View>
		// )
		const routes = [
			{title:'Index', index: 0},
			{title:'Partida', index:1},
			{title:'Info', index:2}
		];
		return (
			<Navigator
				initialRoute={routes[0]}
				initialRouteStack={routes}
				renderScene={(route, navigator) => {
					var onForward = function(){
						const nextIndex = route.index + 1;
						if(typeof routes[nextIndex] == "object"){
							navigator.push(routes[nextIndex])
						}
					}
					var onBack = function(){
						if(route.index > 0){
							navigator.pop();
						}
					}
					switch(route.index){
						case 0:
							return <IndexScene onForward = {onForward} onBack={onBack} />
						case 1:
							return <PartidaScene reset={this.reset} manejadorTableroClick={this.appClick} hist={this.state.historico} valores={this.state.valores} turno={this.state.turno} onForward={onForward} onBack={onBack}/>
					}
				}}
			/>
		)
	}
});

module.exports = App;

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import Cartao from './Cartao';

const PrevisaoItem = (props) => {
  if (props.previsao.length != 0) {
    return (
          <Cartao estilos={estilos.cartao}>
              <View style={estilos.tela}>
                  <Image
                      style={estilos.imagem}
                      source={{uri: "https://openweathermap.org/img/wn/" + props.weather.icon + ".png"}}
                  />
                  <View>
                      <View style={estilos.primeiraLinha}>
                          <Text>{new Date(props.previsao.dt * 1000).toLocaleTimeString()} - Sensação Térmica: {parseFloat((props.previsao.feels_like-273).toFixed(2)) + "\u00B0"}</Text>
                      </View>

                      <View style={estilos.segundaLinha}>
                          <Text style={estilos.valor}>Nascer do Sol: {new Date(props.previsao.sunrise * 1000).toLocaleTimeString()}</Text>
                          <Text style={estilos.valor}>Pôr do Sol: {new Date(props.previsao.sunset * 1000).toLocaleTimeString()}</Text>
                      </View>

                  </View>
              </View>
          </Cartao>
      )
  } else {
    return null;
  }
}

const estilos = StyleSheet.create ({
    primeiraLinha: {
      justifyContent: 'center',
      flexDirection: 'row'
    },
    segundaLinha: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 4,
      borderTopWidth: 1,
      borderTopColor: '#DDD'
    }, 
    cartao: {
      marginBottom: 8,
      backgroundColor: '#FF5E13'
    },
    tela: {
      marginTop: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    imagem: {
      width: 50,
      height: 50
    },
    valor: {
      marginHorizontal: 2
    }
  });

export default PrevisaoItem;
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button, FlatList, Keyboard} from 'react-native';
import PrevisaoItem from './Components/PrevisaoItem'

export default function App() {
  const [previsoes, setPrevisoes] = useState([]);
  const [cidade, setCidade] = useState('');
  const [weather, setWeather] = useState([]);

  const consomeApi = () => {
    const target = endPoint + cidade + "&appid=" + apiKey;
    fetch(target)
    .then((dados) => {
      return dados.json()
    })
    .then((dados) => {
      obtemPrevisoes(dados["city"].coord);
      Keyboard.dismiss()
    });
  }

  const obtemPrevisoes = (coordenadas) => {
    setPrevisoes([]);
    const target = apiLink + coordenadas.lat + "&lon=" + coordenadas.lon + "&exclude=hourly,daily&appid=" + apiKey;
    console.log(target)
    fetch(target)
    .then((dados) => {
      return dados.json()
    })
    .then((dados) => {
      setPrevisoes(dados["current"])
      setWeather(dados["current"].weather[0])
    });
  }

  const capturarCidade = (cidade) => {
    setCidade(cidade);
  }


  const vaiJa = (previsoes) => {
    setOi(previsoes);
  }
  const endPoint = "https://api.openweathermap.org/data/2.5/forecast?lang=pt&units=metric&q=";
  const apiLink = "https://api.openweathermap.org/data/2.5/onecall?lat=";
  const apiKey = '0847b269e42202a3a20645ac4b40df26';
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.entrada}>
        <TextInput
          style={styles.nomeCidade}
          placeholder="Digite o nome de uma cidade"
          value={cidade}
          onPress={console.log(previsoes.length)}
          onChangeText={capturarCidade}
        />
        <Button
          title="Ok"
          onPress={consomeApi}
        />        
      </View>

            <PrevisaoItem 
              previsao={previsoes}
              weather={weather}
            />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#fff'
  },
  nomeCidade: {
    padding: 10,
    borderBottomColor: '#BB96F3',
    borderBottomWidth: 2,
    textAlign: 'left',
    flexGrow: 0.9
  },
  entrada: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 8
  }
});
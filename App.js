import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const buttons = [
    'AC',
    'DEL',
    '%',
    '/',
    7,
    8,
    9,
    '*',
    4,
    5,
    6,
    '-',
    3,
    2,
    1,
    '+',
    0,
    '.',
    '+/-',
    '='
  ]

  const [currentNumber, setCurrentNumber] = useState('')
  const [lastNumber, setLastNumber] = useState('')

  function calculator() {
    const splitNumbers = currentNumber.split(' ')
    const firstNumber = parseFloat(splitNumbers[0])
    const lastNumber = parseFloat(splitNumbers[2])
    const operator = splitNumbers[1]

    switch (operator) {
      case '+':
        setCurrentNumber((firstNumber + lastNumber).toString())
        return
      case '-':
        setCurrentNumber((firstNumber - lastNumber).toString())
        return
      case '*':
        setCurrentNumber((firstNumber * lastNumber).toString())
        return
      case '/':
        setCurrentNumber((firstNumber / lastNumber).toString())
        return
    }
  }

  function handleInput(buttonPressed) {
    console.log(buttonPressed)
    if (
      (buttonPressed === '+') |
      (buttonPressed === '-') |
      (buttonPressed === '*') |
      (buttonPressed === '/')
    ) {
      setCurrentNumber(currentNumber + ' ' + buttonPressed + ' ')
      return
    }
    switch (buttonPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1))
        return
      case 'AC':
        setLastNumber('')
        setCurrentNumber('')
        return
      case '=':
        setLastNumber(currentNumber + ' = ')
        calculator()
        return
      case '+/-':
        return
    }

    setCurrentNumber(currentNumber + buttonPressed)
  }

  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
      width: '100%',
      minHeight: 280,
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    },
    resultText: {
      color: darkMode ? '#f5f5f5' : '#282f38',
      margin: 10,
      fontSize: 40
    },
    historyText: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 20,
      alignSelf: 'flex-end',
      marginRight: 10
    },
    themeButton: {
      backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      alignSelf: 'flex-start',
      bottom: 80,
      margin: 20
    },
    button: {
      borderColor: darkMode ? '#3f4d5b' : '#e5e5e5',
      borderWidth: 1,
      minWidth: 90,
      minHeight: 90,
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    textButton: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 20
    }
  })

  return (
    <View>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Entypo
            name={darkMode ? 'light-up' : 'moon'}
            size={24}
            color={darkMode ? 'white' : 'black'}
            onPress={() => (darkMode ? setDarkMode(false) : setDarkMode(true))}
          />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}=</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map(button =>
          button === '=' ? (
            <TouchableOpacity
              onPress={() => handleInput(button)}
              key={button}
              style={
                ([styles.button, { backgroundColor: '#9DB67B' }],
                (onPress = () => handleInput(button)))
              }
            >
              <Text
                style={[styles.textButton, { color: 'white', fontSize: 28 }]}
              >
                {button}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => handleInput(button)}
              key={button}
              style={[
                styles.button,
                {
                  backgroundColor:
                    typeof button === 'number'
                      ? darkMode === true
                        ? '#303946'
                        : '#fff'
                      : darkMode === true
                      ? '#414853'
                      : '#ededed'
                }
              ]}
            >
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  )
}

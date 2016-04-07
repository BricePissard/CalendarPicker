/**
 * Calendar Picker Component
 * By Stephani Alves - April 11, 2015
 */
'use strict';

import React, { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window'),
  DEVICE_HEIGHT = window.height,
  DEVICE_WIDTH  = window.width,
  CELL_WIDTH = (DEVICE_WIDTH/7) - 7;

var styles = StyleSheet.create({
  calendar: {
    height: 320,
    marginTop: 10,
    borderRadius: 4,
    overflow: 'hidden'
  },
  dayWrapper: {
    width: CELL_WIDTH,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.0)'
  },

  dayButton: {
    width: CELL_WIDTH,
    height: 30,
    paddingBottom:10,
    alignSelf: 'center'
  },

  dayButtonSelected: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0d81ec',
    alignSelf: 'center'
  },

  dayLabel: {
    fontSize: 14,
    color: '#444',
    marginTop: 7,
    marginBottom:4,
    paddingBottom:5,
    alignSelf: 'center'
  },

  dayLabelsWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
    borderColor: 'rgba(0,0,0,0.15)'
  },

  daysWrapper: {
    alignSelf: 'center',
  },

  dayLabels: {
    width: CELL_WIDTH,
    fontSize: 10,
    color: '#444',
    textAlign: 'center',
  },

  selectedDay: {
    width: CELL_WIDTH,
    height:60,
    backgroundColor: '#0d81ec',
    borderRadius: 30,
    overflow: 'hidden',
    alignSelf: 'center'
  },

  monthLabel: {
    fontSize: 19,
    color: '#444',
    width: 160,
    textAlign: 'center'
  },

  headerWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 10,
    padding: 5,
    paddingBottom: 3,
    backgroundColor: 'rgba(0,0,0,0.0)'
  },

  monthSelector: {
    width: 80,
  },

  todayPoint: {
    width:4,
    height:4,
    backgroundColor: 'red',
    position: 'relative',
    top:-10,
    right:-21,
    borderRadius:20,
  },

  prev: {
    fontSize: 12,
    textAlign: 'left',
    color: '#666',
  },

  next: {
    fontSize: 12,
    textAlign: 'right',
    color: '#666',
  },

  yearLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center'
  },

  weeks: {
    flexDirection: 'column'
  },

  weekRow: {
    flexDirection: 'row'
  }
});

module.exports = styles;

import { createElement } from 'lwc';

import ProperlyNestedValidation from 'c/ProperlyNestedValidation';

import { getRecord } from "lightning/uiRecordApi";

import createWidget from '@salesforce/apex/ProperlyNestedApex.createWidget';
// Import mock data to send through the wire adapter.
const mockGetRecord = require("./data/getRecord.json");

const mockGetAccountList = require('./data/getAccountList.json');
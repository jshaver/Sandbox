import * as axios from 'axios';

import { format } from 'date-fns';
import { inputDateFormat } from './constants';

import { API } from './config';

const getWidgets = async function() {
  try {
    const response = await axios.get(`${API}/widgets.json`);

    let data = parseList(response);

    const widgets = data.map(h => {
      h.date = format(h.date, inputDateFormat);
      return h;
    });
    return widgets;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const parseList = response => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

export const data = {
  getWidgets,
};

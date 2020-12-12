import _ from 'lodash';

// FUNCTIONS

export const getRemainingQnt = (data, type, by, mapBy = 'quantity') => {
  let res = _.sum(
    data.filter((itm) => itm[type] === by).map((i) => Number(i[mapBy])),
  );
  return res;
};

export const getNameModelAmtQnt = (data, nameType, byName, byModel, mapBy) => {
  let res = _.sum(
    data
      .filter((itm) => itm[nameType] === byName && itm.model === byModel)
      .map((i) => Number(i[mapBy])),
  );
  return res;
};

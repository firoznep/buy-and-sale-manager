import _ from 'lodash';

export const sortedUniqBy = (arr, by) => {
  return _.compact(
    _.orderBy(
      _.uniq(
        arr.map((item) =>
          by === 'date' ? new Date(item[by]).toDateString() : item[by],
        ),
      ),
    ),
  );
};

export const sortedUniqDataByTwoCon = (arr, name, by) => {
  let fd = arr.filter((item) => item.name === name);
  return _.compact(_.orderBy(_.uniq(fd.map((itm) => itm[by]))));
};

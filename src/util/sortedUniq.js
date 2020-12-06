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

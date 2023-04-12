class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1A) Filtering
    let queryObject = { ...this.queryString }; //create a copy
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObject[el]);

    // 1B) Advanced filtering
    queryObject = JSON.parse(
      JSON.stringify(queryObject).replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      )
    );
    // gte, gt, lte, lt
    // { difficulty: 'easy', page: '3', duration: { gte: '5' } } query string
    // { difficulty: 'easy', page: '3', duration: { $gte: '5' } } expected mongoDB syntax

    // query object can be chained with other query methods until it is awaited
    this.query = this.query.find(queryObject);
    return this;
  }

  sort() {
    // 2) Sorting: chain sort method to query object
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    // 3) Field limiting/ projecting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      // excluding
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    // 4) Pagination
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 3;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;

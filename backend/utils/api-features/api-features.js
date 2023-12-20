class ApiFeatures{
    constructor(query, queryString){
        this.query = query
        this.queryString = queryString
    }

    filter(){
        //exclude special keyword from queryString: page, limit, fields, 
        const queryObject = {...this.queryString}
        const excludeFields = ['page', 'limit', 'fields', 'sort']
        excludeFields.forEach(field => delete queryObject[field])
        this.query = this.query.find(queryObject)
        return this
    }

    sort(){
        let sortBy
        if(this.queryString.sort){
            sortBy = this.queryString.sort.split(',').join(' ')
        }else{
            sortBy = 'created_at'
        }
        this.query = this.query.sort(sortBy)
        return this
    }

    limitFields(){
        let selectFields
        const excludedVersionField = '-__v'
        if(this.queryString.fields){
            selectFields = this.queryString.split(',').join(' ')
        }else{
            selectFields = excludedVersionField
        }
        this.query = this.query.select(selectFields)
    }

    paginate(){
        let page = (this.queryString.page && Number(this.page))|| 1
        let limit = (this.queryString.limit && Number(this.queryString.limit)) || 10
        let skip = (page-1)*limit
        this.query = this.query.skip(skip).limit(limit)
        return this
    }
}

module.exports = ApiFeatures



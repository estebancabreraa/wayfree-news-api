const Pool = require('pg').Pool
const path = require('path')
require('dotenv').config({path: __dirname + '/../../.env'})

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
})

const getUserCredentials = (request, response) => {
  const {email, password} = request.body

  pool.query(process.env.GET_USER_CREDENTIALS_QUERY, [email, password], (error, results) => {
    if (error) {
      throw error
    }
    
    console.log(results)
    //If query found more than one result with email, password parameters...
    if (results.rows.length > 0){ 
     
      response.status(200).json({status: true})
        
    } else {response.status(200).json({status: false})}
  })
}

const getArticles = (request, response) => {
  pool.query(process.env.GET_ARTICLES_QUERY, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAction = (request, response) => {
  pool.query(process.env.GET_ACTION_QUERY, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const insertArticleContent = (request, response) => {
  const {file_name} = request.body

  pool.query(process.env.INSERT_CONTENT_QUERY, [file_name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const insertImageSet = (request, response) => {
  const {images} = request.body

  pool.query(process.env.INSERT_IMAGE_SET_QUERY, [images], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const insertArticle = (request, response) => {
  const {title, date, category, content, image_set, author} = request.body

  pool.query(process.env.INSERT_ARTICLE_QUERY, [title, date, category, content, image_set, author], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getUserCredentials,
  getArticles,
  getAction,
  insertArticleContent,
  insertImageSet,
  insertArticle
}
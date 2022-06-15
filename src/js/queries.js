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
    
    //If query found more than one result with email, password parameters...
    if (results.rows.length > 0){ 
      response.status(200).json({user_id: results.rows[0].user_id, user_name: results.rows[0].user_name, role: results.rows[0].user_role, status: true})
        
    } else {response.status(200).json({status: false})}
  })
}

const getArticles = (request, response) => {
  pool.query(process.env.GET_ARTICLES_QUERY, (error, results) => {
    if (error) {
      throw error
    }
    console.log("Sending articles to client...")
    response.status(200).json(results.rows)
    console.log("Done.")
  })
}

const getLastArticleID = (request, response) => {
  pool.query(process.env.GET_LAST_ARTICLE_ID_QUERY, (error, results) => {
    if (error) {
      throw error
    }
    console.log("Sending article id to client...")
    response.status(200).json(results.rows[0])
    console.log("Done.")
  })
}



const getContentID = (request, response) => {
  pool.query(process.env.GET_CONTENT_ID_QUERY, (error, results) => {
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

const getCategories = (request, response) => {
  pool.query(process.env.GET_CATEGORIES_QUERY, (error, results) => {
    if (error) {
      throw error
    }
    console.log("Sending article categories to client...")
    response.status(200).json(results.rows)
    console.log(results.rows)
    console.log("Done.")
  })
}

const getUserID = (request, response) => {
  pool.query(process.env.GET_USER_ID_QUERY, [user_name], (error, results) => {
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
  const {title, category, author} = request.body

  pool.query(process.env.INSERT_ARTICLE_QUERY, [title, category, author], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const updateArticle = (request, response) => {
  const {title, date, category, author} = request.body

  pool.query(process.env.UPDATE_ARTICLE_QUERY, [title, date, category, author], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const updateArticleStatus = (request, response) => {
  const {article_id, status} = request.body

  pool.query(process.env.ENABLE_DISABLE_ARTICLE_QUERY, [article_id, status], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getUserCredentials,
  getArticles,
  getLastArticleID,
  getAction,
  getCategories,
  insertArticleContent,
  insertImageSet,
  insertArticle,
  updateArticle,
  updateArticleStatus
}
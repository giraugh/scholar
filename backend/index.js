const path = require('path')
const fs = require('fs')
const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()

const APP_PORT = '3500'

app.use(fileUpload())

app.get('/', (req, res) =>
  res.send('root')
)

app.get('/note', (req, res) => {
  if (req.query.name && req.query.subject) {
    res.download(
      path.join(__dirname, `./public/data/notes/${req.query.subject}/${req.query.name}`),
      `${req.query.name}`
    )
  } else {
    res
      .status(400)
      .send('Requires valid ?name and ?subject queries')
  }
})

app.get('/links', (req, res) => {
  if (!req.query.subject) {
    return res
      .status(400)
      .send('Requires valid ?subject query')
  } else {
    const linkData = path.join(__dirname, `./public/data/links/${req.query.subject}.json`)
    if (!fs.existsSync(linkData)) {
      res.send(JSON.stringify({links: []}))
    } else {
      let content = fs.readFileSync(linkData)
      res.send(content.toString())
    }
  }
})

app.post('/uploadLink', (req, res) => {
  if (req.query.link && req.query.subject && req.query.desc) {
    const linkData = path.join(__dirname, `./public/data/links/${req.query.subject}.json`)
    if (!fs.existsSync(linkData)) {
      fs.writeFileSync(linkData, JSON.stringify({links: []}))
    }

    // Get pre-existing link data
    let {links} = JSON.parse(fs.readFileSync(linkData).toString())
    links.push({
      link: req.query.link,
      description: req.query.desc
    })

    // Re-write
    fs.writeFileSync(linkData, JSON.stringify({links}))

    res.send('Succesfully uploaded link!')
  } else {
    res
      .status(400)
      .send('Requires valid ?link, ?desc and ?subject queries')
  }
})

app.post('/uploadNote', (req, res) => {
  if (!req.files) {
    return res
      .status(400)
      .send('No files uploaded')
  } else {
    if (!req.query.subject) {
      return res
        .status(400)
        .send('Requires a ?subject query')
    } else {
      // Create the subject directory if it doesn't exist
      let subject = req.query.subject
      if (!fs.existsSync(path.join(__dirname, `./public/data/notes/${subject}`))) {
        fs.mkdirSync(path.join(__dirname, `./public/data/notes/${subject}`))
      }

      // Move the file to the subject directory
      let note = req.files.note
      if (note) {
        note.mv(`./public/data/notes/${subject}/${note.name}`, err => {
          if (err) {
            return res
              .status(500)
              .send(err)
          } else {
            res.send('Upload Succesfull!')
          }
        })
      } else {
        return res
          .status(400)
          .send('Invalid or malformed files. Ensure file is non zero length.')
      }
    }
  }
})

app.get('/uploadPortal', (req, res) =>
  res.sendFile(path.join(__dirname, './public/uploadPortal.html'))
)

app.listen(APP_PORT, _ => console.log(`Listening on ${APP_PORT}`))

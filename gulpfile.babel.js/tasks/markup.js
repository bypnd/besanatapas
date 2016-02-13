import assemble from 'assemble'
import fs from 'fs'
import gulp from 'gulp'
import { plugins, reload } from '../lib'
import { markup as config } from '../config'

gulp.task('markup', function() {
  // HTML
  const markup = assemble()
  markup.create('siteTemplates', {viewType: 'partial'})
  markup.siteTemplate('asite', {
    content: fs.readFileSync(config.asite)
      .toString('utf8')
  })
  markup.data(config.data)
  markup.partials(config.partials)

  return markup.src(config.pages, config.options)
    .pipe(markup.renderFile())
    .pipe(plugins.realFavicon.injectFaviconMarkups(
      JSON.parse(
        fs.readFileSync(config.faviconData)
      ).favicon.html_code))
    .pipe(plugins.rename({extname: '.html'}))
    .pipe(markup.dest(config.dest))
    .pipe(reload({stream: true}))
})

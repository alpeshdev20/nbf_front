import { useHeAudioSitemap } from '@/services/sitemap';
import { get } from '@/utils/fetch';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://netbookflix.com/'; // Replace with your domain

export async function GET() {
  // Path to the routes directory inside the app folder
  const routesDir = path.join(process.cwd(), 'app/(routes)');

  // He Audio Book Request
  const dynamicHeAudioBookResponse = await get(`${process.env.API_URL}get-he-audio-sitemap`);

  // He Book Request
  const dynamicHeBookResponse = await get(`${process.env.API_URL}get-he-books-sitemap`);

  // He Video Request
  const dynamicVideosResponse = await get(`${process.env.API_URL}get-he-videos-sitemap`);

  // He Class-note Request
  const dynamicHeClaaNoteResponse = await get(`${process.env.API_URL}get-he-class-note-sitemap`);

  // He Class-note Request
  const dynamicgamifiedLearningResponse = await get(`${process.env.API_URL}get-he-gamified-learning-sitemap`);

  // k12 Audio Book Request
  const dynamicK12AudioBookResponse = await get(`${process.env.API_URL}get-k12-audio-sitemap`);

  // k12 Book Request
  const dynamicK12BookResponse = await get(`${process.env.API_URL}get-k12-books-sitemap`);

  // k12 Video Request
  const dynamicK12VideosResponse = await get(`${process.env.API_URL}get-k12-videos-sitemap`);

  // k12 Class-note Request
  const dynamicK12ClaaNoteResponse = await get(`${process.env.API_URL}get-k12-class-note-sitemap`);

  // k12 Class-note Request
  const dynamicK12gamifiedLearningResponse = await get(`${process.env.API_URL}get-he-gamified-learning-sitemap`);

  console.log("dynamicHeAudioBookResponse" ,dynamicHeAudioBookResponse);
  
  //He Audio Sitemap Data  
  let dynamicK12Audio = [];
  if (dynamicK12AudioBookResponse && dynamicK12AudioBookResponse.response) {
    dynamicK12Audio = dynamicK12AudioBookResponse.response.map(item => item.slug);
  }

  //He Book Sitemap Data  
  let dynamicRoutesK12eBook = [];
  if (dynamicK12BookResponse && dynamicK12BookResponse.response) {
    dynamicRoutesK12eBook = dynamicK12BookResponse.response.map(item => item.slug);
  }

  //He Video Sitemap Data  
  let dynamicRoutesHeVideos = [];
  if (dynamicVideosResponse && dynamicVideosResponse.response) {
    dynamicRoutesHeVideos = dynamicVideosResponse.response.map(item => item.slug);
  }

  //He Class Note Sitemap Data  
  let dynamicRoutesHeClassnote = [];
  if (dynamicHeClaaNoteResponse && dynamicHeClaaNoteResponse.response) {
    dynamicRoutesHeClassnote = dynamicHeClaaNoteResponse.response.map(item => item.slug);
  }

  //He Gamified Learning Note Sitemap Data  
  let dynamicRoutesGamifiedLearning = [];
  if (dynamicgamifiedLearningResponse && dynamicgamifiedLearningResponse.response) {
    dynamicRoutesGamifiedLearning = dynamicgamifiedLearningResponse.response.map(item => item.slug);
  }


  //He Audio Sitemap Data  
  let dynamicRoutesHeAudio = [];
  if (dynamicHeAudioBookResponse && dynamicHeAudioBookResponse.response) {
    dynamicRoutesHeAudio = dynamicHeAudioBookResponse.response.map(item => item.slug);
  }

  //He Book Sitemap Data  
  let dynamicRoutesHeBook = [];
  if (dynamicHeBookResponse && dynamicHeBookResponse.response) {
    dynamicRoutesHeBook = dynamicHeBookResponse.response.map(item => item.slug);
  }

  //He Video Sitemap Data  
  let dynamicRoutesK12Videos = [];
  if (dynamicK12VideosResponse && dynamicK12VideosResponse.response) {
    dynamicRoutesK12Videos = dynamicK12VideosResponse.response.map(item => item.slug);
  }

  //He Class Note Sitemap Data  

  let dynamicRoutesK12Classnote = [];
  if (dynamicK12ClaaNoteResponse && dynamicK12ClaaNoteResponse.response) {
    dynamicRoutesK12Classnote = dynamicK12ClaaNoteResponse.response.map(item => item.slug);
  }
  else {
    console.log("dynamicK12ClaaNoteResponse.response not avaialble");
  }

  //He Class Note Sitemap Data  
  let dynamicRoutesK12GamifiedLearning = [];
  if (dynamicK12gamifiedLearningResponse && dynamicK12gamifiedLearningResponse.response) {
    dynamicRoutesK12GamifiedLearning = dynamicK12gamifiedLearningResponse.response.map(item => item.slug);
  }


  // Function to get all static route files
  const getRoutes = (dir) => {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let routes = [];

    files.forEach((file) => {
      if (file.isDirectory()) {
        // Recursively check directories
        routes = [...routes, ...getRoutes(path.join(dir, file.name))];
      } else if (file.name.endsWith('.tsx')) {
        // Add the route if it ends with `.tsx`
        const route = path.relative(routesDir, path.join(dir, file.name));
        const routePath = route
          .replace(/\\/g, '/')
          .replace('.tsx', '')
          .replace(/index$/, ''); // Remove `index` from the URL
        routes.push(routePath);
      }
    });

    return routes;
  };

  const staticRoutes = getRoutes(routesDir);

  // Filter out '/page' from both static and dynamic routes
  const filteredStaticRoutes = staticRoutes
    .map(route => `${BASE_URL}${route}`)
    .filter(route => !route.endsWith('/page'))  // Remove routes ending with "/page"
    .map(route => route.replace(/\/page$/, '')); // Remove "/page" if present

  // --------------------------------------HE------------------------------------------  

  // Filter out dynamic HE Audio routes that end with "/page" and remove the "/page"
  const filteredDynamicHeAudioRoutes = dynamicRoutesHeAudio
    .map(slug => `${BASE_URL}resources/audio-books/${slug}`)
    .filter(route => !route.endsWith('/page'))  // Remove "/page" from the end
    .map(route => route.replace(/\/page$/, '')); // Remove "/page" if present

  // Filter out dynamic HE Audio routes that end with "/page" and remove the "/page"
  const filteredDynamicHeBookRoutes = dynamicRoutesHeBook
    .map(slug => `${BASE_URL}resources/books/${slug}`)
    .filter(route => !route.endsWith('/page'))  // Remove "/page" from the end
    .map(route => route.replace(/\/page$/, '')); // Remove "/page" if present

  // Filter out dynamic HE Videos routes that end with "/page" and remove the "/page"
  const filteredDynamicHeVideosRoutes = dynamicRoutesHeVideos
    .map(slug => `${BASE_URL}resources/videos/${slug}`)
    .filter(route => !route.endsWith('/page'))  // Remove "/page" from the end
    .map(route => route.replace(/\/page$/, '')); // Remove "/page" if present

  // Filter out dynamic HE Class note routes that end with "/page" and remove the "/page"
  const filteredDynamicHeClaaNoteRoutes = dynamicRoutesHeClassnote
    .map(slug => `${BASE_URL}resources/class-notes/${slug}`)
    .filter(route => !route.endsWith('/page'))  // Remove "/page" from the end
    .map(route => route.replace(/\/page$/, '')); // Remove "/page" if present

  // Filter out dynamic HE Class note routes that end with "/page" and remove the "/page"
  const filteredDynamicHeGamifiedLearningRoutes = dynamicRoutesGamifiedLearning
    .map(slug => `${BASE_URL}resources/gamified-learning/${slug}`)
    .filter(route => !route.endsWith('/page'))  // Remove "/page" from the end
    .map(route => route.replace(/\/page$/, '')); // Remove "/page" if present

  // ----------------------------------------------------K12-------------------------------------------------
  // Filter out dynamic HE Audio routes that end with "/page" and remove the "/page"
  const filteredDynamicdynamicK12AudioRoutes = dynamicK12Audio
    .map(slug => `${BASE_URL}k-12-school/resources/audio-books/${slug}`)
    .filter(route => !route.endsWith('/page'))  // Remove "/page" from the end
    .map(route => route.replace(/\/page$/, '')); // Remove "/page" if present

  // Filter out dynamic HE Audio routes that end with "/page" and remove the "/page"
  const filteredDynamicK12BookRoutes = dynamicRoutesK12eBook
    .map(slug => `${BASE_URL}k-12-school/resources/books/${slug}`)
    .filter(route => !route.endsWith('/page'))  // Remove "/page" from the end
    .map(route => route.replace(/\/page$/, '')); // Remove "/page" if present

  // Filter out dynamic HE Videos routes that end with "/page" and remove the "/page"
  const filteredDynamicK12VideosRoutes = dynamicRoutesK12Videos
    .map(slug => `${BASE_URL}k-12-school/resources/videos/${slug}`)
    .filter(route => !route.endsWith('/page'))  // Remove "/page" from the end
    .map(route => route.replace(/\/page$/, '')); // Remove "/page" if present

  // Filter out dynamic HE Class note routes that end with "/page" and remove the "/page"
  const filteredDynamicK12ClaaNoteRoutes = dynamicRoutesK12Classnote
    .map(slug => `${BASE_URL}k-12-school/resources/class-notes/${slug}`)
    .filter(route => !route.endsWith('/page'))  // Remove "/page" from the end
    .map(route => route.replace(/\/page$/, '')); // Remove "/page" if present

  // Filter out dynamic HE Class note routes that end with "/page" and remove the "/page"
  const filteredDynamicK12GamifiedLearningRoutes = dynamicRoutesK12GamifiedLearning
    .map(slug => `${BASE_URL}k-12-school/resources/gamified-learning/${slug}`)
    .filter(route => !route.endsWith('/page'))  // Remove "/page" from the end
    .map(route => route.replace(/\/page$/, '')); // Remove "/page" if present



  // Combine static and filtered dynamic routes
  const allRoutes = [
    ...filteredDynamicHeAudioRoutes, //He Audio Book
    ...filteredDynamicHeBookRoutes, //He Book
    ...filteredDynamicHeVideosRoutes, //He videos
    ...filteredDynamicHeClaaNoteRoutes,//He Class note
    ...filteredDynamicHeGamifiedLearningRoutes,//He GamifiedLearning

    // K12 Routes
    ...filteredDynamicdynamicK12AudioRoutes, //k-12 Audio Book
    ...filteredDynamicK12BookRoutes, //K12-Book
    ...filteredDynamicK12VideosRoutes,//K12-video
    ...filteredDynamicK12ClaaNoteRoutes, //K12 Class note
    ...filteredDynamicK12GamifiedLearningRoutes, //K12 GamifiedLearning

    // static routes
    ...filteredStaticRoutes,
  ];

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allRoutes
      .map(route => {
        return `
      <url>
        <loc>${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
      </url>
    `;
      })
      .join('')}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

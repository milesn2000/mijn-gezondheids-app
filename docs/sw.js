self.addEventListener('install', function(event)
{
    event.waitUntil
    (
        caches.open('workout-cache-v3').then(function(cache)
        {
            return cache.addAll
            ([
                '/',
                '/index.html',
                '/invoer.html',
                '/overzicht.html',
                '/style.css',
                '/app.js'
            ])
        })
    )
})

self.addEventListener('fetch', function(event)
{
    event.respondWith(
        caches.match(event.request).then(function(response)
        {
            return response || fetch(event.request)
        })
    )
})
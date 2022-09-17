const API = 'https://youtube138.p.rapidapi.com/channel/videos/?id=UCpyYZ-xPlZJqv3KwtnGr7UQ&hl=en&gl=US'

const content = null || document.querySelector('#videos')

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '6d7dbef881msh3576e9034d5103fp123c19jsnea1fe58f38e9',
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com',
    }
}

async function fetchData (urlApi) {
    const response = await fetch(urlApi, options)
    const data = await response.json()

    return data
}

(async () => {
    try {
        content.innerHTML = Array.from([1, 2, 3, 4]).map(() => `
            <div class="border border-slate-100 shadow rounded-md p-4 w-full mx-auto">
                <div class="animate-pulse flex space-x-4">
                    <div class="flex-1 space-y-6 py-1">
                        <div class="h-20 bg-slate-200 rounded-md"></div>
                        <div class="space-y-3">
                            <div class="grid grid-cols-3 gap-4">
                                <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                                <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div class="h-2 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('')

        const youtube = await fetchData(API)

        let videos = youtube.contents.slice(0, 8).map(content => `
            <a href="https://youtu.be/${content.video.videoId}" class="group relative">
                <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${content.video.thumbnails[3].url}" alt="${content.video.title}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${content.video.title}
                    </h3>
                </div>
            </a>
        `).join('')

        content.innerHTML = videos
    } catch (error) {
        console.log(error)
    }
})();

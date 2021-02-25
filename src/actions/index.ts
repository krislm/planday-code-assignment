import axios from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { typedAction } from './helpers';
import { FILTER_IMAGES, Image, RESET_FILTER, SET_IMAGES } from '../types.d';

const dummyData: Image[] = [
        {
            "title": "\u30c6\u30ec\u30d3\u4f53\u64cd\uff3b\u5b57\uff3d",
            "link": "https:\/\/www.flickr.com\/photos\/fuba_recorder\/50248753343\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2020-08-21T06:35:48-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/fuba_recorder\/\">fuba_recorder<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/fuba_recorder\/50248753343\/\" title=\"\u30c6\u30ec\u30d3\u4f53\u64cd\uff3b\u5b57\uff3d\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50248753343_18a28d7de8_m.jpg\" width=\"240\" height=\"135\" alt=\"\u30c6\u30ec\u30d3\u4f53\u64cd\uff3b\u5b57\uff3d\" \/><\/a><\/p> ",
            "published": "2020-08-20T21:35:48Z",
            "author": "nobody@flickr.com (\"fuba_recorder\")",
            "author_id": "34127069@N02",
            "tags": "\u30c6\u30ec\u30d3\u4f53\u64cd"
        },
        {
            "title": "2020-08-20_11-35-58",
            "link": "https:\/\/www.flickr.com\/photos\/zologan\/50248754793\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2020-08-20T23:35:52-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/zologan\/\">Sr.Lago<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/zologan\/50248754793\/\" title=\"2020-08-20_11-35-58\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50248754793_b34e5668a6_m.jpg\" width=\"240\" height=\"180\" alt=\"2020-08-20_11-35-58\" \/><\/a><\/p> ",
            "published": "2020-08-20T21:36:18Z",
            "author": "nobody@flickr.com (\"Sr.Lago\")",
            "author_id": "85953937@N08",
            "tags": ""
        },
        {
            "title": "Best art walls images : Minimalist white living room decor ideas",
            "link": "https:\/\/www.flickr.com\/photos\/188908107@N03\/50248754893\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2020-08-20T14:36:20-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/188908107@N03\/\">dearart0net<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/188908107@N03\/50248754893\/\" title=\"Best art walls images : Minimalist white living room decor ideas\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50248754893_befedea4bf_m.jpg\" width=\"160\" height=\"240\" alt=\"Best art walls images : Minimalist white living room decor ideas\" \/><\/a><\/p> <p>Best art walls images : &#8211; Picture : &#8211; Description -Read More &#8211;<br \/> <br \/> <br \/> <a href=\"https:\/\/dearart.net\/architecture\/walls\/best-art-walls-images-minimalist-white-living-room-decor-ideas\/\" rel=\"noreferrer nofollow\">dearart.net\/architecture\/walls\/best-art-walls-images-mini...<\/a><\/p>",
            "published": "2020-08-20T21:36:20Z",
            "author": "nobody@flickr.com (\"dearart0net\")",
            "author_id": "188908107@N03",
            "tags": ""
        },
        {
            "title": "Iguaz\u00fa Fall's",
            "link": "https:\/\/www.flickr.com\/photos\/145885693@N04\/50248755343\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2019-02-21T16:45:42-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/145885693@N04\/\">p.mamede<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/145885693@N04\/50248755343\/\" title=\"Iguaz\u00fa Fall&#039;s\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50248755343_cf1c675a4d_m.jpg\" width=\"240\" height=\"159\" alt=\"Iguaz\u00fa Fall&#039;s\" \/><\/a><\/p> ",
            "published": "2020-08-20T21:36:29Z",
            "author": "nobody@flickr.com (\"p.mamede\")",
            "author_id": "145885693@N04",
            "tags": ""
        },
        {
            "title": "Schalowturako (Lat. Tauraco schalowi)",
            "link": "https:\/\/www.flickr.com\/photos\/toms-fotokiste\/50248755378\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2020-05-12T12:08:53-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/toms-fotokiste\/\">Tom&#039;s Fotokiste Zootierfotografie (thanks vor over<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/toms-fotokiste\/50248755378\/\" title=\"Schalowturako (Lat. Tauraco schalowi)\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50248755378_6a83e1bc64_m.jpg\" width=\"160\" height=\"240\" alt=\"Schalowturako (Lat. Tauraco schalowi)\" \/><\/a><\/p> <p>Zoo Krefeld<\/p>",
            "published": "2020-08-20T21:36:30Z",
            "author": "nobody@flickr.com (\"Tom's Fotokiste Zootierfotografie (thanks vor over\")",
            "author_id": "123597211@N03",
            "tags": "1891 afrika helmturakos reichenow schalowsturaco schalowstoerako schalowturako tauracoschalowi touracodeschalow turacodeschalow turakos v\u00f6gel wirbeltiere zookrefeld vreden nordrheinwestfalen deutschland"
        },
        {
            "title": "Ikarus 280.26 #937",
            "link": "https:\/\/www.flickr.com\/photos\/maciek2173\/50248755538\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2020-08-20T22:55:28-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/maciek2173\/\">Ikarus1007<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/maciek2173\/50248755538\/\" title=\"Ikarus 280.26 #937\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50248755538_43b796fa90_m.jpg\" width=\"240\" height=\"180\" alt=\"Ikarus 280.26 #937\" \/><\/a><\/p> ",
            "published": "2020-08-20T21:36:35Z",
            "author": "nobody@flickr.com (\"Ikarus1007\")",
            "author_id": "88894128@N02",
            "tags": "937"
        },
        {
            "title": "Once there was a girl...",
            "link": "https:\/\/www.flickr.com\/photos\/151105598@N06\/50249397726\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2020-08-20T17:34:51-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/151105598@N06\/\">robby54b<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/151105598@N06\/50249397726\/\" title=\"Once there was a girl...\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50249397726_9e1cb5174c_m.jpg\" width=\"180\" height=\"240\" alt=\"Once there was a girl...\" \/><\/a><\/p> ",
            "published": "2020-08-20T21:35:39Z",
            "author": "nobody@flickr.com (\"robby54b\")",
            "author_id": "151105598@N06",
            "tags": ""
        },
        {
            "title": "LX06FKN",
            "link": "https:\/\/www.flickr.com\/photos\/128219613@N04\/50249398081\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2020-08-20T22:35:45-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/128219613@N04\/\">Ryan&#039;s Random Buses<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/128219613@N04\/50249398081\/\" title=\"LX06FKN\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50249398081_759d8907ae_m.jpg\" width=\"240\" height=\"162\" alt=\"LX06FKN\" \/><\/a><\/p> ",
            "published": "2020-08-20T21:35:45Z",
            "author": "nobody@flickr.com (\"Ryan's Random Buses\")",
            "author_id": "128219613@N04",
            "tags": ""
        },
        {
            "title": "Milking Station",
            "link": "https:\/\/www.flickr.com\/photos\/185271447@N03\/50249398916\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2020-08-20T14:36:02-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/185271447@N03\/\">lucy Succubu76<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/185271447@N03\/50249398916\/\" title=\"Milking Station\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50249398916_03e41f09c0_m.jpg\" width=\"240\" height=\"180\" alt=\"Milking Station\" \/><\/a><\/p> <p><a href=\"http:\/\/maps.secondlife.com\/secondlife\/Princess%20Paradise\/37\/186\/1002\" rel=\"noreferrer nofollow\">maps.secondlife.com\/secondlife\/Princess%20Paradise\/37\/186...<\/a><br \/> <br \/> <a href=\"http:\/\/maps.secondlife.com\/secondlife\/Princess Paradise\/37\/186\/1002\" rel=\"noreferrer nofollow\">Visit this location at D-ZONE - adult hangout - milking project - RLV in Second Life<\/a><\/p>",
            "published": "2020-08-20T21:36:02Z",
            "author": "nobody@flickr.com (\"lucy Succubu76\")",
            "author_id": "185271447@N03",
            "tags": "firestorm secondlife secondlife:region=princessparadise secondlife:parcel=dzoneadulthangoutmilkingprojectrlv secondlife:x=36 secondlife:y=186 secondlife:z=1001"
        },
        {
            "title": "Cinnabar Caterpillar",
            "link": "https:\/\/www.flickr.com\/photos\/125407841@N08\/50249399116\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2020-08-15T10:24:15-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/125407841@N08\/\">Simply Sharon !<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/125407841@N08\/50249399116\/\" title=\"Cinnabar Caterpillar\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50249399116_27fa30d8ed_m.jpg\" width=\"180\" height=\"240\" alt=\"Cinnabar Caterpillar\" \/><\/a><\/p> ",
            "published": "2020-08-20T21:36:06Z",
            "author": "nobody@flickr.com (\"Simply Sharon !\")",
            "author_id": "125407841@N08",
            "tags": ""
        },
        {
            "title": "IMG_20200820_103731",
            "link": "https:\/\/www.flickr.com\/photos\/154335226@N05\/50249399521\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2020-08-20T10:37:31-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/154335226@N05\/\">SKI SCHOOL LIBERI TUTTI<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/154335226@N05\/50249399521\/\" title=\"IMG_20200820_103731\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50249399521_bf9084566e_m.jpg\" width=\"180\" height=\"240\" alt=\"IMG_20200820_103731\" \/><\/a><\/p> <p>dav<\/p>",
            "published": "2020-08-20T21:36:16Z",
            "author": "nobody@flickr.com (\"SKI SCHOOL LIBERI TUTTI\")",
            "author_id": "154335226@N05",
            "tags": ""
        },
        {
            "title": "_DSF1350.jpg",
            "link": "https:\/\/www.flickr.com\/photos\/semeraro\/50249599807\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2019-04-28T10:16:52-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/semeraro\/\">Scatti di memoria<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/semeraro\/50249599807\/\" title=\"_DSF1350.jpg\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50249599807_2f8e3be637_m.jpg\" width=\"240\" height=\"160\" alt=\"_DSF1350.jpg\" \/><\/a><\/p> ",
            "published": "2020-08-20T21:36:00Z",
            "author": "nobody@flickr.com (\"Scatti di memoria\")",
            "author_id": "97235695@N00",
            "tags": ""
        },
        {
            "title": "snapshot",
            "link": "https:\/\/www.flickr.com\/photos\/164966079@N02\/50249600142\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2020-08-20T14:36:07-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/164966079@N02\/\">Giiliana<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/164966079@N02\/50249600142\/\" title=\"snapshot\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50249600142_c1ed42c08f_m.jpg\" width=\"240\" height=\"180\" alt=\"snapshot\" \/><\/a><\/p> <p><a href=\"http:\/\/maps.secondlife.com\/secondlife\/ViSion Land\/198\/51\/23\" rel=\"noreferrer nofollow\">Visit this location at {ViSion} \/\/ Mesh Clothings &amp; Lingerie \/\/ Mainstore in Second Life<\/a><\/p>",
            "published": "2020-08-20T21:36:07Z",
            "author": "nobody@flickr.com (\"Giiliana\")",
            "author_id": "164966079@N02",
            "tags": "firestorm secondlife secondlife:region=visionland secondlife:parcel={vision}meshclothingslingeriemainstore secondlife:x=198 secondlife:y=51 secondlife:z=23"
        },
        {
            "title": "Pomposa\u2019s curvy shape",
            "link": "https:\/\/www.flickr.com\/photos\/144500960@N02\/50249600427\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2020-08-19T22:00:21-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/144500960@N02\/\">IshaDelicioso<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/144500960@N02\/50249600427\/\" title=\"Pomposa\u2019s curvy shape\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50249600427_ac05f16765_m.jpg\" width=\"240\" height=\"240\" alt=\"Pomposa\u2019s curvy shape\" \/><\/a><\/p> ",
            "published": "2020-08-20T21:36:13Z",
            "author": "nobody@flickr.com (\"IshaDelicioso\")",
            "author_id": "144500960@N02",
            "tags": ""
        },
        {
            "title": " ",
            "link": "https:\/\/www.flickr.com\/photos\/161289772@N02\/50249600687\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2020-08-18T15:14:23-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/161289772@N02\/\">Hadman71<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/161289772@N02\/50249600687\/\" title=\" \"><img src=\"https:\/\/live.staticflickr.com\/65535\/50249600687_62795f1bda_m.jpg\" width=\"240\" height=\"160\" alt=\" \" \/><\/a><\/p> ",
            "published": "2020-08-20T21:36:19Z",
            "author": "nobody@flickr.com (\"Hadman71\")",
            "author_id": "161289772@N02",
            "tags": ""
        },
        {
            "title": "Today\u2019s super dogs!",
            "link": "https:\/\/www.flickr.com\/photos\/apavolunteer\/50249600842\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2020-08-20T11:14:21-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/apavolunteer\/\">volunteer1705<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/apavolunteer\/50249600842\/\" title=\"Today\u2019s super dogs!\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50249600842_cbfeef311e_m.jpg\" width=\"240\" height=\"180\" alt=\"Today\u2019s super dogs!\" \/><\/a><\/p> ",
            "published": "2020-08-20T21:36:23Z",
            "author": "nobody@flickr.com (\"volunteer1705\")",
            "author_id": "38642656@N04",
            "tags": ""
        },
        {
            "title": "Cubrebocas",
            "link": "https:\/\/www.flickr.com\/photos\/189556983@N05\/50249600982\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2020-08-17T14:22:11-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/189556983@N05\/\">mrgrafikmexico<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/189556983@N05\/50249600982\/\" title=\"Cubrebocas\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50249600982_069a31e0f7_m.jpg\" width=\"240\" height=\"180\" alt=\"Cubrebocas\" \/><\/a><\/p> ",
            "published": "2020-08-20T21:36:25Z",
            "author": "nobody@flickr.com (\"mrgrafikmexico\")",
            "author_id": "189556983@N05",
            "tags": ""
        },
        {
            "title": "snapshot",
            "link": "https:\/\/www.flickr.com\/photos\/189567329@N08\/50249601082\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2020-08-20T14:36:28-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/189567329@N08\/\">vanessabea100<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/189567329@N08\/50249601082\/\" title=\"snapshot\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50249601082_d8fd060ff2_m.jpg\" width=\"240\" height=\"180\" alt=\"snapshot\" \/><\/a><\/p> <p><a href=\"http:\/\/maps.secondlife.com\/secondlife\/AvDopt\/25\/161\/3000\" rel=\"noreferrer nofollow\">Visit this location in Second Life<\/a><\/p>",
            "published": "2020-08-20T21:36:28Z",
            "author": "nobody@flickr.com (\"vanessabea100\")",
            "author_id": "189567329@N08",
            "tags": "firestorm secondlife secondlife:region=avdopt secondlife:parcel=avdoptcomwearetheainadoption secondlife:x=24 secondlife:y=160 secondlife:z=3000"
        },
        {
            "title": " ",
            "link": "https:\/\/www.flickr.com\/photos\/189623622@N04\/50249601267\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2019-06-14T18:28:04-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/189623622@N04\/\">love.gad89<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/189623622@N04\/50249601267\/\" title=\" \"><img src=\"https:\/\/live.staticflickr.com\/65535\/50249601267_1809e05aee_m.jpg\" width=\"180\" height=\"240\" alt=\" \" \/><\/a><\/p> ",
            "published": "2020-08-20T21:36:32Z",
            "author": "nobody@flickr.com (\"love.gad89\")",
            "author_id": "189623622@N04",
            "tags": ""
        },
        {
            "title": "20200820_143114",
            "link": "https:\/\/www.flickr.com\/photos\/189516683@N06\/50249601727\/",
            "media": {"m":"https://via.placeholder.com/150"},
            "date_taken": "2020-08-20T14:31:14-08:00",
            "description": " <p><a href=\"https:\/\/www.flickr.com\/people\/189516683@N06\/\">jayneedle42<\/a> posted a photo:<\/p> <p><a href=\"https:\/\/www.flickr.com\/photos\/189516683@N06\/50249601727\/\" title=\"20200820_143114\"><img src=\"https:\/\/live.staticflickr.com\/65535\/50249601727_6cfac9e66c_m.jpg\" width=\"180\" height=\"240\" alt=\"20200820_143114\" \/><\/a><\/p> ",
            "published": "2020-08-20T21:36:43Z",
            "author": "nobody@flickr.com (\"jayneedle42\")",
            "author_id": "189516683@N06",
            "tags": ""
        }
    ];

// Todo: move into images.action.ts
function fetchImages() {
    return async (dispatch: Dispatch<AnyAction>) => {
        const images: Image[] = await axios.get('https://flickr.com/services/feeds/photos_public.gne?format=json', {headers: {'Access-Control-Allow-Origin': '*'} })
            .then((response: any) => response.items)
            .catch((err) => {
                console.log(err)
                return dummyData
            });
        dispatch(setImages(images))
    }
}

function filterImages(searchTerm: string) {
    return typedAction(FILTER_IMAGES, {search: searchTerm})
}

function resetFilter() {
    console.log('reset')
    return typedAction(RESET_FILTER);
}

function setImages(images: Image[]) {
    return typedAction(SET_IMAGES, images);
}

export { filterImages, resetFilter, fetchImages };
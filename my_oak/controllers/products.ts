import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { Produkt } from '../types.ts';

let produkte: Produkt[] = [
    {
        id: '1',
        name: 'Produkt 1',
        description: 'Das ist Produkt 1',
        preis: 19.99
    },
    {
        id: '2',
        name: 'Produkt 2',
        description: 'Das ist Produkt 2',
        preis: 29.99
    },
    {
        id: '3',
        name: 'Produkt 3',
        description: 'Das ist Produkt 3',
        preis: 39.99
    }
]

/*
router.get('/api/v1/products',(ctx) => {
    ctx.response.body = 'H a l l o    W e l t  !!!!';
});
*/


// @desc    Get all products
// @route   GET /api/v1/products
const getProdukte = async ({ response }: { response: any }) => {
    response.headers.set("Access-Control-Allow-Origin","*");
    response.headers.set("Server","deno");
    response.status = 200;
    response.body = {
            success: true,
            data: produkte
        }
};

// @desc    Get single product
// @route   GET /api/v1/products/:id
const getProdukt = async ({ params, response }: { params: { id: string }, response: any }) => {
    const produkt: Produkt | undefined = produkte.find(p => {return (p.id === params.id)});
    if (produkt) {
        console.log(produkt);
        response.headers.set("Access-Control-Allow-Origin","*");
        response.headers.set("Server","deno");
        response.status = 200;
        response.body = {
            success: true,
            data: produkt
        }
    } else {
        response.status = 404;
        response.body = {
            success: false,
            msg: 'kein Produkt gefunden'
        }
    }
}

// @desc    Add product
// @route   Post /api/v1/products
const addProdukt = async ({ request, response }: { request: any, response: any }) => {    
    const body = await request.body();
    if(!request.hasBody) {
        response.status = 400;
        response.body = {
            success: false,
            msg: 'Keine Daten!!!'
        } 
    } else {
        const produkt: Produkt = await body.value;
        produkt.id = v4.generate();
        produkte.push(produkt);
        response.status = 201;
        response.body = {
            success: true,
            data: produkt
        }
    }
}

// @desc    Update product
// @route   PUT /api/v1/products/:id
const updateProdukt = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
    const produkt: Produkt | undefined = produkte.find(p => {return (p.id === params.id)});
    if (produkt) {
        const body = await request.body();
        const updateData: { name?: string, description?: string, preis?: number } = await body.value;
        produkte = produkte.map(p => p.id === params.id ? {...p, ...updateData} : p);
        response.status = 200;
        response.body = {
            success: true,
            data: produkte
        }
    } else {
        response.status = 404;
        response.body = {
            success: false,
            msg: 'kein Produkt gefunden'
        }
    }
}

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
const deleteProdukt = async ({ params, response }: { params: { id: string }, response: any }) => {
    produkte = produkte.filter(p => p.id !== params.id);
    response.body = {
        secces: true,
        msg: 'Produkt gelöscht'
    }
}

export { getProdukte, getProdukt, addProdukt, updateProdukt, deleteProdukt };


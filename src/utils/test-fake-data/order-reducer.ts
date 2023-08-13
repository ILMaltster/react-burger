export const orderItemsSourceFake = {
    success: true,
    name: "Space флюоресцентный бургер",
    order: {
        ingredients: [
            {
                _id: "643d69a5c3f7b9001cfa0943",
                name: "Соус фирменный Space Sauce",
                type: "sauce",
                proteins: 50,
                fat: 22,
                carbohydrates: 11,
                calories: 14,
                price: 80,
                image: "https://code.s3.yandex.net/react/code/sauce-04.png",
                image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                __v: 0
            },
            {
                _id: "643d69a5c3f7b9001cfa093d",
                name: "Флюоресцентная булка R2-D3",
                type: "bun",
                proteins: 44,
                fat: 26,
                carbohydrates: 85,
                calories: 643,
                price: 988,
                image: "https://code.s3.yandex.net/react/code/bun-01.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
                __v: 0
            }
        ],
        _id: "64d654e482e277001bfa8740",
        owner: {
            name: "ilya228",
            email: "il.solodovnik@gmail.com",
            createdAt: "2023-05-28T06:49:01.020Z",
            updatedAt: "2023-06-27T15:37:28.105Z"
        },
        status: "done",
        name: "Space флюоресцентный бургер",
        createdAt: "2023-08-11T15:33:56.303Z",
        updatedAt: "2023-08-11T15:33:56.491Z",
        number: 16461,
        price: 1068
    }
}

export const selectedOrderSourceFake = {
    _id: "64d65c0b82e277001bfa8763",
    ingredients: [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa0944"
    ],
    owner: "64cfb14b82e277001bfa73cb",
    status: "done",
    name: "Антарианский традиционный-галактический флюоресцентный бургер",
    createdAt: "2023-08-11T16:04:27.970Z",
    updatedAt: "2023-08-11T16:04:28.227Z",
    number: 16465,
    __v: 0
}

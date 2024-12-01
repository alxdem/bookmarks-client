import { useEffect, useState } from 'react';
import { Bookmark } from '../types/common';

const tempData = [
    {
        _id: "rerwr3",
        userId: "321321",
        title: "Facebook",
        url: "https://www.facebook.com/",
        description: "",
        categoryId: "c1",
        order: 0,
        image: "",
    },
    {
        _id: "dsd72331",
        userId: "3213321",
        title: "Kinopoisk",
        url: "https://www.kinopoisk.ru/",
        description: "Поиск фильмов, новости кино, отзывы пользователей, афиша кинотеатров",
        categoryId: "c1",
        order: 2,
        image: "https://yastatic.net/s3/kinopoisk-frontend/common-static/img/projector-favicon/favicon-144.png",
    },
    {
        _id: "dsd723g",
        userId: "3213321",
        title: "Onix",
        url: "https://www.kinopoisk.ru/",
        description: "Поиск фильмов, новости кино, отзывы пользователей, афиша кинотеатров",
        categoryId: "c2",
        order: 0,
        image: "https://yastatic.net/s3/kinopoisk-frontend/common-static/img/projector-favicon/favicon-144.png",
    },
    {
        _id: "dsd7231",
        userId: "3213a321",
        title: "Kinopoisk",
        url: "https://www.kinopoisk.ru/",
        description: "Поиск фильмов, новости кино, отзывы пользователей, афиша кинотеатров",
        categoryId: "c1",
        order: 2,
        image: "https://yastatic.net/s3/kinopoisk-frontend/common-static/img/projector-favicon/favicon-144.png",
    },
    {
        _id: "dsd723dg",
        userId: "3213321",
        title: "Onix",
        url: "https://www.kinopoisk.ru/",
        description: "Поиск фильмов, новости кино, отзывы пользователей, афиша кинотеатров",
        categoryId: "c2",
        order: 0,
        image: "https://yastatic.net/s3/kinopoisk-frontend/common-static/img/projector-favicon/favicon-144.png",
    }
];

function useGetBookmarks() {
    const [data, setData] = useState<Bookmark[]>([]);

    useEffect(() => {
        setData(tempData);
    }, []);

    return data;
}

export default useGetBookmarks;
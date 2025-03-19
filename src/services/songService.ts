import Song, {ISong} from '../models/song.js';
import {Schema} from 'mongoose';

//createSong , getAllSongs, getSongById, updateSong, deleteSong

export const createSong = async (song:ISong) => {
    const newSong = new Song(song);
    return await newSong.save();
};

export const getAllSongs = async () => {
    return await Song.find();
};

export const getSongById = async (id:Schema.Types.ObjectId) => {
    return await Song.findById(id);
};

export const getSongByName = async (name:string) => {
    return await Song.find({title:name});
};

export const getSongByArtist = async (artist:string) => {
    return await Song.find({artist:artist});
};

export const getSongByGenre = async (genre:string) => {
    return await Song.find({genre:genre});
};

export const getSymilarBpm = async (bpm:number) => {
    const songs = await Song.find();
    return songs.filter(song => song.bpm !== undefined && song.bpm !== null && Math.abs(song.bpm - bpm) < 20);
};

export const updateSong = async (id:Schema.Types.ObjectId, song:ISong) => {
    return await Song.findByIdAndUpdate;
};

export const deleteSong = async (id:Schema.Types.ObjectId) => {
    return await Song.findByIdAndDelete(id);
};
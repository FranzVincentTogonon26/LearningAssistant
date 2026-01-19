import Document from '../models/Document.js';
import Flashcard from '../models/Flashcard.js';
import Quiz from '../models/Quiz.js';

import { extracTextFromPDF } from '../utils/pdfParser.js';
import { chunktext } from '../utils/textChunker.js';
import fs from 'fs/promises';
import mongoose from 'mongoose';

// @desc Upload PDF Document
// @route POST /api/documents/upload
// @access Prqivate

export const uploadDocument = async ( req, res, next ) => {

    try {

    } catch (error) {
        // Clean up dile on error
        if(req.file){
            await fs.unlink(req.file.path).catch(() => {});
        }

        next(error)

    }

};

// @desc Get all user documents
// @route GET /api/documents
// @access Private

export const getDocuments = async ( req, res, next ) => {

    try {

    } catch (error) {

    }

};

// @desc Get single document with chunks
// @route GET /api/documents/:id
// @access Private

export const getDocument = async ( req, res, next ) => {

    try {

    } catch (error) {

    }

};

// @desc Delete document
// @route DELETE /api/documents/:id
// @access Private

export const deleteDocument = async ( req, res, next ) => {

    try {

    } catch (error) {

    }

};

// @desc Upload document file
// @route PUT /api/documents/:id
// @access Private

export const updateDocument = async ( req, res, next ) => {

    try {

    } catch (error) {

    }

};
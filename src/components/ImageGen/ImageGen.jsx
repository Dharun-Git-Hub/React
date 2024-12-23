import React, { useState } from 'react';
import './ImageGen.css';

const ImageGen = () => {
    const apiKey = "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";
    const maxImages = 4; // Number of images to generate for each prompt
    const [loading, setLoading] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);

    // Function to generate a random number between min and max (inclusive)
    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Function to disable the generate button during processing
    const disableGenerateButton = () => {
        document.getElementById("generate").disabled = true;
    };

    // Function to enable the generate button after process
    const enableGenerateButton = () => {
        document.getElementById("generate").disabled = false;
    };

    // Function to clear image grid
    const clearImageGrid = () => {
        setImageUrls([]);
    };

    // Function to generate images
    const generateImages = async (input) => {
        disableGenerateButton();
        clearImageGrid();
        setLoading(true);

        const newImageUrls = [];

        for (let i = 0; i < maxImages; i++) {
            // Generate a random number between 1 and 10000 and append it to the prompt
            const randomNumber = getRandomNumber(1, 10000);
            const prompt = `${input} ${randomNumber}`;
            // We added random number to prompt to create different results
            const response = await fetch(
                "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({ inputs: prompt }),
                }
            );

            if (!response.ok) {
                console.error(`Error: ${response.status} ${response.statusText}`);
                continue;
            }

            const blob = await response.blob();
            const imgUrl = URL.createObjectURL(blob);
            newImageUrls.push(imgUrl);
        }

        setImageUrls(newImageUrls);
        setLoading(false);
        enableGenerateButton();
    };

    const downloadImage = (imgUrl, imageNumber) => {
        const link = document.createElement("a");
        link.href = imgUrl;
        // Set filename based on the selected image
        link.download = `image-${imageNumber + 1}.jpg`;
        link.click();
    };

    return (
        <div className="containerimagen">
            <h1>Ai Image Generator</h1>
            <p className="pp">Be a bit Creative !</p>
            <form className="gen-form">
                <input type="text" id="user-prompt" placeholder="Type your prompt here..." autoComplete="off" />
                <button type="button" id="generate" onClick={() => {
                    const input = document.getElementById("user-prompt").value;
                    generateImages(input);
                }}>Generate</button>
                <button id="del" onClick={() => {clearImageGrid}} > Del </button>
            </form>

            <div className="result1">
                {loading && <div id="loading1">Generating...</div>}
                <div id="image-grid">
                    {imageUrls.map((url, index) => (
                        <img key={index} src={url} alt={`art-${index + 1}`} onClick={() => downloadImage(url, index)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageGen;

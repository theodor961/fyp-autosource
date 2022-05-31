import React, { useEffect, useRef, useState } from "react";

import { addDoc, collection, doc, getDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase-config";

import MiniLoader from '../components/MiniLoader';
import InputForm from '../components/InputForm';
import Image from '../components/Image';
import RecorderHook from '../components/RecorderHook';
import styles from './RequestAutopartForm.module.css';

import { BsImageFill } from 'react-icons/bs'
import { AiTwotoneAudio } from 'react-icons/ai'
import { IoText } from 'react-icons/io5'
import { FaPaperPlane } from 'react-icons/fa'

export default function RequestAutopartForm() {
    const title = useRef();
    const description = useRef();
    const brand = useRef();
    const model = useRef();
    const category = useRef();
    const year = useRef();
    const condition = useRef();
    const image = useRef('');
    const audioRef = useRef('');

    const [categories, setCategories] = useState([]);
    const [models, setModels] = useState([]);
    const [cars, setCars] = useState([]);

    const requestCollRef = collection(db, 'requests');
    const categoryDocRef = doc(db, 'categories', 'category');
    const brandDocRef = doc(db, 'categories', 'cars_info');

    const [loader, setLoader] = useState(false);

    const [imgProgress, setImgProgress] = useState(0);
    const imgUrl = useRef();
    const [imgUpState, setImgUpState] = useState(true);
    const [imagePreview, setImagePreview] = useState('');

    const [audioProgress, setAudioProgress] = useState(0);
    const audioUrl = useRef();
    const [audioUpState, setAudioUpState] = useState(true);
    const [audioPreview, setAudioPreview] = useState('');

    const sendRequest = async () => {
        try {
            if (brand.current.value == 'default') {
                document.getElementById("brand").innerHTML = "you should select a brand";
            } else if (model.current.value == 'default') {
                document.getElementById("model").innerHTML = "you should select a model";
            } else if (year.current.value == 'default') {
                document.getElementById("year").innerHTML = "you should select a year";
            } else if (category.current.value == 'default') {
                document.getElementById("category").innerHTML = "you should select a category";
            } else if (condition.current.value == 'default') {
                document.getElementById("condition").innerHTML = "you should select a condition";
            } else if (title.current.value == '') {
                document.getElementById("title").innerHTML = "you should add a title to the auto-part";
            } else if (description.current.value == '') {
                document.getElementById("description").innerHTML = "you should describe the auto-part";
            }
            else {
                const request = await addDoc(requestCollRef, {
                    user_id: auth.currentUser.uid,
                    created_at: new serverTimestamp(),
                    condition: condition.current.value,
                    title: title.current.value,
                    description: description.current.value,
                    status: "Waiting",
                    part_info: {
                        brand: brand.current.value,
                        category: category.current.value,
                        model: model.current.value,
                        year: year.current.value,
                    },
                    image: imgUrl.current,
                    audio: audioUrl.current,
                });
                brand.current.value = 'default';
                model.current.value = 'default';
                year.current.value = 'default';
                category.current.value = 'default';
                condition.current.value = 'default';
                description.current.value = '';
                document.getElementById("description").innerHTML = "";
                title.current.value = '';
                document.getElementById("title").innerHTML = "";
                //audioRef.current.value = '';
                image.current.value = '';
                setImagePreview('');
                setAudioPreview('');
                
                console.log(request);
            }
        } catch (error) {
            alert(error);
        }
    }

    //build year selection
    let thisYear = (new Date()).getFullYear();
    let allYears = [];
    for (let x = 0; x <= 30; x++) {
        allYears.push(thisYear - x)
    }

    useEffect(() => {
        getCategory();
        getCars();
    }, [])

    //get the auto-part category
    const getCategory = async () => {
        try {
            const docSnap = await getDoc(categoryDocRef);
            setCategories(docSnap.data().part_category);
        } catch (error) {
            console.log(error);
        }
    }

    //get the car brand and model
    const getCars = async () => {
        try {
            const docSnap = await getDoc(brandDocRef);
            setCars(docSnap.data().cars);
        } catch (error) {
            console.log(error);
        }
    }

    //image
    function getImagePreview() {
        const url = URL.createObjectURL(image.current.files[0]);
        setImagePreview(url);
        console.log("image url: ", url);
    }

    function handleImgUpload() {
        let enteredImg = image.current.files[0]; //ref
        if (!enteredImg) return;
        console.log("entered image: ", enteredImg)
        // Create the file metadata
        /* @type {any} */
        const metadata = { contentType: 'image/*' };

        const storageRef = ref(storage, 'requests/' + auth.currentUser.uid + '/images/' + (new Date().toString().substring(0, 25)));
        const uploadTask = uploadBytesResumable(storageRef, enteredImg, metadata);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImgProgress(progress);
            }, {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    //setImgUrl(downloadURL);
                    imgUrl.current = downloadURL;
                    setImgUpState(true);
                    console.log("hone: " + imgUrl.current);
                    //scroll.current.scrollIntoView({ behavior: 'smooth' })
                }).catch(() => { 
                    alert("could not get the Image download URL "); 
                    setImgUpState(true); 
                });
            }
        );

    }

    //audio
    function getAudioPreview() {
        const url2 = URL.createObjectURL(audioRef.current.files[0]);
        setAudioPreview(url2);
    }

    function handleAudioUpload(file) {
        // const enteredAudio= audioRef.current.files[0]; //ref
        const enteredAudio = file;
        if (!enteredAudio) return;
        setAudioUpState(false);

        // Create the file metadata
        /* @type {any} */

        const metadata = { contentType: 'audio/*' };
        const storageRef = ref(storage, 'requests/' + auth.currentUser.uid + '/audios/' + (new Date().toString().substring(0, 25)));
        const uploadTask = uploadBytesResumable(storageRef, enteredAudio, metadata);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setAudioProgress(progress);
            }, {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    //setAudioUrl(downloadURL);
                    audioUrl.current = downloadURL;
                    setAudioUpState(true);
                    console.log("audio hone: ", audioUrl);
                    //scroll.current.scrollIntoView({ behavior: 'smooth' })
                }).catch(() => { 
                    alert("could not get the audio download URL "); 
                    setAudioUpState(true); 
                });
            }
        );
    }

    const audio = document.createElement("audio"),
        canPlayOPUS = audio.canPlayType('audio/webm;codecs="opus"') !== "";


    return (
        <div className={styles.mainContainer}>
            <h1>RequestAutopartForm</h1>
            
                <p>Car Brand:
                    <select
                        ref={brand}
                        required

                        onChange={(e) => {
                            setModels(cars[e.target.selectedIndex].models);
                            if (brand.current.value == 'default') {
                                document.getElementById("brand").innerHTML = "you should select a brand";
                            } else {
                                document.getElementById("brand").innerHTML = "";
                            }
                        }}
                    >
                        {/* <option value='default' defaultValue='default'>select brand</option> */}
                        {cars.map((car, index) => {
                            return (
                                <option key={index} value={car.brand}>{car.brand}</option>

                            )
                        })}
                    </select>
                </p><p id="brand"></p>


                <p>Car Model:
                    <select
                        ref={model}
                        required
                        onChange={() => {
                            if (model.current.value == 'default') {
                                document.getElementById("model").innerHTML = "you should select a model";
                            } else {
                                document.getElementById("model").innerHTML = "";
                            }
                        }}
                    >
                        <option value='default' defaultValue='default'>select model</option>
                        {models.map((model, index) => {
                            return (
                                <option key={index} value={model}>{model}</option>
                            )
                        })}
                    </select>
                </p><p id="model"></p>

                <p>Build year:
                    <select
                        ref={year}
                        required
                        onChange={() => {
                            if (year.current.value == 'default') {
                                document.getElementById("year").innerHTML = "you should select a year";
                            } else {
                                document.getElementById("year").innerHTML = "";
                            }
                        }}
                    >
                        <option value='default' defaultValue='default'>select year</option>
                        {allYears.map((year) => {
                            return (
                                <option key={year} value={year}>{year}</option>
                            )
                        })}
                    </select>
                </p><p id="year"></p>

                <p>Auto-part Category:
                    <select
                        ref={category}
                        required
                        onChange={() => {
                            if (category.current.value == 'default') {
                                document.getElementById("category").innerHTML = "you should select a category";
                            } else {
                                document.getElementById("category").innerHTML = "";
                            }
                        }}
                    >
                        <option value='default' defaultValue='default'>select category</option>
                        {categories.map((category, index) => {
                            return (
                                <option key={index} value={category}>{category}</option>
                            )
                        })}
                    </select>
                </p><p id="category"></p>

                <p>Condition:
                    <select
                        ref={condition}
                        required
                        onChange={() => {
                            if (condition.current.value == 'default') {
                                document.getElementById("condition").innerHTML = "you should select a condition";
                            } else {
                                document.getElementById("condition").innerHTML = "";
                            }
                        }}
                    >
                        <option value='default' defaultValue='default'>select condition</option>
                        <option value="New">New</option>
                        <option value="Old">Old</option>
                        <option value="Both">Both</option>
                    </select>
                </p><p id="condition"></p>

                <InputForm
                    ref={title}
                    required={true}
                    placeholder={'Autopart title'}
                    type="text"
                />
                <p id="title"></p> 

                <InputForm
                    ref={description}
                    required={true}
                    placeholder={'Description about the autopart'}
                    type="text"
                />
                <p id="description"></p> <br/>

                <p>
                    <BsImageFill className={styles.formIcons} />Add image {!imgUpState && <> {Number((imgProgress).toFixed(1))}%  </>}
                    <button onClick={() => handleImgUpload()}>upload</button>
                </p>
                <div className={styles.imageInput}>
                    <input type='file' accept="image/*" ref={image} multiple onChange={() => { setImgUpState(false); getImagePreview(); }} />
                    {imagePreview && <Image src={imagePreview} className={styles.imagePreview} />}
                </div>

                <p><AiTwotoneAudio className={styles.formIcons} />Add audio</p>
                {!audioUpState && <> {Number((audioProgress).toFixed(1))}% <MiniLoader /> </>}
                <div className={styles.audioInput}>
                    {!canPlayOPUS ? //check broswer if safari render a special component
                        <div>
                            <button onClick={() => handleAudioUpload(audioRef.current.files[0])}>upload</button>
                            <button onClick={() => { setAudioPreview(''); audioRef.current.value = null }}>clear</button>
                            <input type='file' accept="audio/*" capture onChange={() => getAudioPreview()} />
                            <audio controls src={audioPreview} />
                            </div> :
                        <RecorderHook  ref={audioRef} getBolb={b => { handleAudioUpload(b.blob); }} />
                    }
                </div>

                <br /><br />
                
            

            <button onClick={sendRequest}>Send Request</button>

        </div>
    )
}
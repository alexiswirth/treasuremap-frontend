'use client'

import styles from "./page.module.css";
import React, { useState } from 'react';
import TreasureMap from "./components/treasuremap/TreasureMap";
import { Map, parseTreasureMap } from "@/utils/parser";
import FileValidator, { MapData } from "@/utils/FileValidator";
import FileUploader from "./components/uploader/FileUploader";
import { uploadFile } from "./services/apiService";


export default function Home() {
  const [data, setData] = useState<Map>({
    width: 0,
    height: 0,
    mountains: [],
    treasures: [],
    adventurers: [],
  });

  const [mapData, setMapData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {

        const content = e.target?.result;
        if (typeof content === "string") {
          const validator: FileValidator = new FileValidator();
          const validatedData: string = validator.validate(content);
          setMapData(validatedData);
          setError(null);
        }
      } catch (err: any) {
        setMapData(null);
        setError(err.message);
      }
    }
    reader.readAsText(file);
  };

  const [status, setStatus] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!mapData) {
      alert("Veuillez sélectionner un fichier.");
      return;
    }

    try {
      setStatus("Uploading...");
      const response = await uploadFile(mapData);
      setStatus("Upload réussi !");
      setData(parseTreasureMap(response))
    } catch (error) {
      setStatus("Échec de l'upload.");
    }
  };
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>Chargez votre fichier</h1>
          <FileUploader handleFileUpload={handleFileUpload} />
          {
            mapData ? <button onClick={handleUpload} >Simulation!</button> : error ? <p style={{ color: "red" }}>{error}</p> : null
          }
        </div>
      <div>
        {data.adventurers.length > 0 ? <><p>Map:</p><TreasureMap mapData={data} /></> : <p>Waiting information...</p>}
      </div>
        
      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}

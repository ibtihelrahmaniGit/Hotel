import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailleGuest = () => {
    const { roomNumber } = useParams();
    const [guest, setGuest] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGuestDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/guests/${roomNumber}`);
                setGuest(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails du hote:", error);
            }
        };
        fetchGuestDetails();
    }, [roomNumber]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setLoading(true);
        
        const formData = new FormData();
        formData.append("photo", selectedFile);

        try {
            const response = await axios.post(`http://localhost:5000/api/guests/${roomNumber}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setGuest((prevGuest) => ({ ...prevGuest, photo: response.data.photoUrl }));
        } catch (error) {
            console.error("Erreur lors de l'upload de la photo:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!guest) return <p style={{ textAlign: "center", fontSize: "18px", color: "#6A5ACD" }}>Chargement...</p>;

    return (
        <div style={{ display: "flex", padding: 20, fontFamily: "Arial, sans-serif" }}>
            <div style={{ flex: 2, paddingRight: 20 }}>
                <h2 style={{ color: "#6A5ACD" }}>Détails du Chembre</h2>

                {/* First row of widgets - side by side */}
                <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                    {/* Temperature Widget */}
                    <div style={{ flex: 1, background: "#f9f9f9", padding: 20, borderRadius: 8 }}>
                        <h3 style={{ color: "#6A5ACD" }}>Temperature</h3>
                        <div style={{ 
                            background: "white", 
                            height: 200, 
                            borderRadius: 8, 
                            overflow: "hidden", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center"
                        }}>
                            <img 
                                src="/src/static/R1.png" 
                                alt="Temperature"
                                style={{ width: "100%", height: "100%" }}
                            />
                        </div>
                    </div>
                    
                    {/* Humidity Widget */}
                    <div style={{ flex: 1, background: "#f9f9f9", padding: 20, borderRadius: 8 }}>
                        <h3 style={{ color: "#6A5ACD" }}>Humidity</h3>
                        <div style={{ 
                            background: "white", 
                            height: 200, 
                            borderRadius: 8, 
                            overflow: "hidden", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center"
                        }}>
                            <img 
                                src="/src/static/R2.png"
                                alt="Humidity"
                                style={{ width: "100%", height: "100%"}}
                            />
                        </div>
                    </div>
                </div>

                {/* Pir Motion Widget (full width) */}
                <div style={{ marginBottom: "20px" }}>
                    <div style={{ background: "#f9f9f9", padding: 20, borderRadius: 8 }}>
                        <h3 style={{ color: "#6A5ACD" }}>Pir Motion</h3>
                        <div style={{ 
                            background: "white", 
                            height: 200, 
                            borderRadius: 8, 
                            overflow: "hidden", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center"
                        }}>
                            <img 
                                src="/src/static/R4.png" 
                                alt="PIR Motion"
                                style={{ width: "100%", height: "100%"}}
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            <div style={{ flex: 1, background: "#fff", padding: 20, borderRadius: 8, boxShadow: "0 0 10px rgba(0,0,0,0.1)", textAlign: "center" }}>
                {guest.photo ? (
                    <img
                        src={`http://localhost:5000${guest.photo}`} 
                        alt="Photo du bébé"
                        style={{ width: 150, height: 150, borderRadius: "50%", objectFit: "cover", marginBottom: 10, marginLeft: 100 }}
                    />
                ) : (
                    <p style={{ color: "gray" }}>Aucune photo disponible</p>
                )}
                
                <h3>Informations sur le hôte</h3>
                <p><strong>Nom :</strong> {guest.guestName}</p>
                <p><strong>Date de naissance :</strong> {guest.birthDate ? new Date(guest.birthDate).toLocaleDateString() : "N/A"}</p>
                <p><strong>Salle :</strong> {guest.roomNumber}</p>

                <h3 style={{ marginTop: 20 }}>Informations sur les parents</h3>
                <p><strong>Nom du père :</strong> {guest.fatherName}</p>
                <p><strong>Nom de la mère :</strong> {guest.motherName}</p>
                <p><strong>N° Contact :</strong> {guest.phoneNumber}</p>
                <p><strong>N° CIN du père :</strong> {guest.idCardNumber}</p>

                <h3 style={{ marginTop: 20 }}>Uploader une photo</h3>
                <input type="file" onChange={handleFileChange} />
                <button 
                    onClick={handleUpload} 
                    style={{ marginTop: 10, padding: 8, backgroundColor: loading ? "gray" : "#6A5ACD", color: "white", border: "none", borderRadius: 5, cursor: loading ? "not-allowed" : "pointer" }}
                    disabled={loading}
                >
                    {loading ? "Chargement..." : "Upload"}
                </button>
            </div>
        </div>
    );
};

export default DetailleGuest;

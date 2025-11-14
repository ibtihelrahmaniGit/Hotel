import React, { useState } from 'react';

const Add = () => {
  const [formData, setFormData] = useState({
    guestName: '',
    birthDate: '',
    fatherName: '',
    motherName: '',
    idCardNumber: '',
    phoneNumber: '',
    roomNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    for (let key in formData) {
      if (!formData[key]) {
        alert(`Le champ "${key}" est requis.`);
        return;
      }
    }

    try {
      const response = await fetch("http://localhost:5000/api/guests/add", { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      alert('Hôte ajouté avec succès !');
      console.log("Server response:", data);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la communication avec le serveur.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">Ajouter un hôte</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nom du hôte</label>
            <input 
              type="text" name="guestName" value={formData.guestName} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#6A5ACD]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Date de naissance</label>
            <input 
              type="date" name="birthDate" value={formData.birthDate} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#6A5ACD]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Nom du père</label>
            <input 
              type="text" name="fatherName" value={formData.fatherName} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#6A5ACD]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Nom de la mère</label>
            <input 
              type="text" name="motherName" value={formData.motherName} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#6A5ACD]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">N° de carte d'identité</label>
              <input 
                type="text" name="idCardNumber" value={formData.idCardNumber} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#6A5ACD]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">N° de téléphone</label>
              <input 
                type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#6A5ACD]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Numéro de chambre</label>
            <input 
              type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#6A5ACD]"
            />
          </div>

          <button
            type="submit"
            className="w-full text-white py-2 rounded-sm"
            style={{ backgroundColor: "#6A5ACD" }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#5B4FCF")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#6A5ACD")}
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;

import type { PlatesObj } from '../types/types';

const BASE_URL = 'http://localhost:3000';

export async function getPlatesData() {
  try {
    const apires = await fetch(`${BASE_URL}/plates`);
    const apidata = await apires.json();
    return apidata;
  } catch (err) {
    console.log('getPlatesData error', err);
  }
}

export async function postPlateData(dataToPost: PlatesObj) {
  try {
    const apires = await fetch(`${BASE_URL}/plates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToPost),
    });
    const apidata = await apires.json();
    return apidata;
  } catch (err) {
    console.log('postPlateData error', err);
  }
}

export async function deletePlateData(id: string) {
  try {
    const apires = await fetch(`${BASE_URL}/plates/${id}`, {
      method: 'DELETE',
    });
    const apidata = await apires.json();
    return apidata;
  } catch (err) {
    console.log('deletePlateData error', err);
  }
}

export async function updatePlateData(dataToUpdate: PlatesObj) {
  try {
    const apires = await fetch(`${BASE_URL}/plates`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToUpdate),
    });
    const apidata = await apires.json();
    return apidata;
  } catch (err) {
    console.log('updatePlateData error', err);
  }
}

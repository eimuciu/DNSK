import { useEffect, useState } from 'react';
import css from './App.module.scss';
import PlatesList from './components/PlatesList/PlatesList';
import Header from './components/Header/Header';
import { getPlatesData } from './api/api';
import type { PlatesObj } from './types/types';

async function actionGetData(setData: any) {
  const data = await getPlatesData();
  setData(data.data);
}

function App() {
  const [data, setData] = useState<PlatesObj[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    actionGetData(setData);
  }, []);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const searchFilter = (): PlatesObj[] => {
    if (!search) {
      return data;
    }
    return data.filter((sObj: PlatesObj) =>
      sObj.plate.toLowerCase().includes(search.toLowerCase()),
    );
  };

  const addNewRecord = (plateObj: PlatesObj) => {
    const dataCopy = [...data, plateObj];
    dataCopy.sort((a, b) => (a.name > b.name ? 1 : -1));
    setData(dataCopy);
  };

  const deleteRecord = (id: string) => {
    setData((prev) => prev.filter((sObj) => sObj.id !== id));
  };

  const updateRecord = (plateObj: PlatesObj) => {
    const newData = data.map((sObj) =>
      sObj.id === plateObj.id ? plateObj : sObj,
    );
    newData.sort((a, b) => (a.name > b.name ? 1 : -1));
    setData(newData);
  };

  return (
    <div className={css.main}>
      <Header
        searchTerm={search}
        handleSearch={handleSearch}
        addNewRecord={addNewRecord}
      />
      <PlatesList
        platesData={searchFilter()}
        deleteRecord={deleteRecord}
        updateRecord={updateRecord}
      />
    </div>
  );
}

export default App;

import Home from "./components/Home";
import HomeStudent from "./components/Home-Student";
import HomeAdmin from "./components/Home-Admin";
import DataStudent from "./components/Student/DataStudent";
import CreateStudent from "./components/Student/CreateStudent";
import UpdateStudent from "./components/Student/UpdateStudent";
import SearchStudent from "./components/Student/SearchStudent";
import StudentLogin from "./components/Login-Student";
import AdminLogin from "./components/Login-Admin";
import DataCourse from "./components/Course/DataCourse";
import CreateCourse from "./components/Course/CreateCourse";
import UpdateCourse from "./components/Course/UpdateCourse";
import SearchCourse from "./components/Course/SearchCourse";

import CreateAdmin from "./components/Admin/CreateAdmin";
import DataAdmin from "./components/Admin/DataAdmin";
import UpdateAdmin from "./components/Admin/UpdateAdmin";

import CreatePostponement from "./components/Postponement/CreatePostponement";
import DataPostponement from "./components/Postponement/DataPostponement";
import UpdatePostponement from "./components/Postponement/UpdatePostponement";
import SearchPostponement from "./components/Postponement/SearchPostponement";

import DataDormitory from "./components/Dormitory/DataDormitory";
import CreateDormitory from "./components/Dormitory/CreateDormitory";
import UpdateDormitory from "./components/Dormitory/UpdateDormitory";
import SearchDormitory from "./components/Dormitory/SearchDormitory";

import DataSuggestion from "./components/Suggestion/DataSuggestion";
import CreateSuggestion from "./components/Suggestion/CreateSuggestion";
import UpdateSuggestion from "./components/Suggestion/UpdateSuggestion";

import DataPetition from "./components/Petition/DataPetition";
import UpdatePetition from "./components/Petition/UpdatePetition";
import CreatePetition from "./components/Petition/CreatePetition";

import DataDiscipline from "./components/Discipline/DataDiscipline";
import CreateDiscipline from "./components/Discipline/CreateDiscipline";
import UpdateDiscipline from "./components/Discipline/UpdateDiscipline";
import SearchDiscipline from "./components/Discipline/SearchDiscipline";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/StudentLogin" element={<StudentLogin />} />
      <Route path="/AdminLogin" element={<AdminLogin />} />

      <Route path="/HomeStudent" element={<HomeStudent />} />
      <Route path="/HomeAdmin" element={<HomeAdmin />} />

      <Route path="/DataStudent" element={<DataStudent />} />
      <Route path="/CreateStudent" element={<CreateStudent />} />
      <Route path="/DataStudent/UpdateStudent/:id" element={<UpdateStudent />} />
      <Route path="/DataStudent/SearchStudent/:id" element={<SearchStudent />} />
      <Route path="/DataCourse" element={<DataCourse />} />
      <Route path="/CreateCourse" element={<CreateCourse />} />
      <Route path="/DataCourse/UpdateCourse/:id" element={<UpdateCourse />} />
      <Route path="/DataCourse/SearchCourse/:id" element={<SearchCourse />} />

      <Route path="/CreateAdmin" element={<CreateAdmin />} />
      <Route path="/DataAdmin" element={<DataAdmin />} />
      <Route path="/DataAdmin/UpdateAdmin/:id" element={<UpdateAdmin />} />

      <Route path="/CreatePostponement" element={<CreatePostponement />} />
      <Route path="/DataPostponement" element={<DataPostponement />} />
      <Route path="/DataPostponement/UpdatePosponement/:id" element={<UpdatePostponement />} />
      <Route path="/DataPostponement/SearchPostponement/:id" element={<SearchPostponement />} />

      <Route path="/DataDormitory" element={<DataDormitory />} />
      <Route path="/CreateDormitory" element={<CreateDormitory />} />
      <Route path="/DataDormitory/UpdateDormitory/:id" element={<UpdateDormitory />} />
      <Route path="/DataDormitory/SearchDormitory/:id" element={<SearchDormitory />} />

      <Route path="/DataSuggestion" element={<DataSuggestion />} />
      <Route path="/CreateSuggestion" element={<CreateSuggestion />} />
      <Route path="/DataSuggestion/UpdateSuggestion/:id" element={<UpdateSuggestion />} />

      <Route path="/CreatePetition" element={<CreatePetition />} />
      <Route path="/DataPetition" element={<DataPetition />} />
      <Route path="/DataPetition/UpdatePetition/:id" element={<UpdatePetition />} />

      <Route path="/DataDiscipline" element={<DataDiscipline />} />
      <Route path="/CreateDiscipline" element={<CreateDiscipline />} />
      <Route path="/DataDiscipline/UpdateDiscipline/:id" element={<UpdateDiscipline />} />
      <Route path="/SearchDiscipline" element={<SearchDiscipline />} />

    </Routes>

  );
}
export default App;

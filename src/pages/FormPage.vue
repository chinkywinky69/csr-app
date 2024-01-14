<template>
  <q-page padding>
    <div class="text-center">
      <q-img width="900px" src="../img/logo2.png" />
      <div class="text-h4 ">
        Academic Information Management System
      </div>
    </div>
    <div class="q-pa-xl">
      <div class="bg-blue-2 q-pa-md">
        <div class="text-h6 text-red-5">NOTES:</div>
        <div class="q-ml-md text-body2 text-grey-7">
          <div class="q-ma-none">Fields with asterisk (*) are required.</div>
          <div>Put a WORKING e-mail, verification will be sent to your e-mail.</div>
        </div>
      </div>
      <div class="q-pa-md q-my-md bg-white" padding>
        <div class="text-h6 text-bold">ADMISSION FORM</div>
        <q-separator />
        <q-form @submit.prevent="createMember">
          <div class="column q-gutter-sm">
            <div class="row q-gutter-sm">
              <q-input class="col" v-model="formData.lastName" filled placeholder="Your Last Name" hint="Last Name*"
                dense="dense" :rules="[(val) => !!val]" />
              <q-input class="col" v-model="formData.firstName" filled placeholder="Your First Name" hint="First Name*"
                dense="dense" :rules="[(val) => !!val]" />
              <q-input class="col" v-model="formData.middleName" filled placeholder="Your Middle Name" hint="Middle Name"
                dense="dense" :rules="[(val) => !!val]" />
              <q-input class="col" v-model="formData.suffix" filled placeholder="Your Suffix" hint="Suffix"
                dense="dense" />
            </div>
            <div class="row q-gutter-sm">
              <q-input class="col" v-model="formData.birthday" filled placeholder="Date of Birth*" hint="Your Birthday"
                dense="dense" type="date" :rules="[(val) => !!val]" />
              <q-input class="col" v-model="formData.email" filled placeholder="Your Email" hint="Email*" dense="dense"
                type="email" :rules="emailRules" />
              <q-input class="col" v-model="formData.fbAccount" filled placeholder="Your Facebook Account"
                hint="Facebook Account" dense="dense" />
            </div>
            <div class="row q-gutter-sm">
              <q-select class="col" v-model="formData.countryCode" filled label="Country Code" hint="Your Country Code*"
                dense="dense" :options="countryCodes" :rules="[(val) => !!val]" />
              <q-input class="col" v-model="formData.mobileNumber" filled placeholder="Your Mobile Number"
                hint="Mobile Number*" dense="dense" type="number" :rules="[(val) => !!val]" />
              <q-input class="col" v-model="formData.telephoneNumber" filled placeholder="Your Telephone Number"
                hint="Telephone Number" dense="dense" type="number" />
            </div>
            <div class="row q-gutter-sm">
              <q-select class="col" v-model="formData.classification" :options="classifiedAs" filled label="Classified As"
                hint="Classified As*" dense="dense" :rules="[(val) => !!val]" />
              <q-select class="col" v-model="selectedDepartment" :options="department" filled label="Your Department"
                hint="Department*" dense="dense" :rules="[(val) => !!val]" />
              <q-select class="col" v-model="selectedProgam" :options="programChoices" filled label="Your Program"
                hint="Program" dense="dense" :rules="[(val) => !!val]" />
            </div>
            <div class="row q-gutter-sm">
              <q-input class="col" v-model="formData.lastSchoolAttended" filled placeholder="Last School Attended"
                hint="Last School Attended" dense="dense" />
              <q-input class="col" v-model="formData.schoolAddress" filled placeholder="School Address"
                hint="School Address" dense="dense" />
              <q-select class="col" v-model="formData.schoolType" :options="schoolType" filled label="Your School Type"
                hint="School Type" dense="dense" />
            </div>
            <div class="row q-gutter-sm">
              <q-select class="col" v-model="selectedYearLevel" :options="yearLevels" filled label="Year Level"
                hint="Your Year Level*" dense="dense" :rules="[(val) => !!val]" />
              <q-input class="col" v-model="formData.citizenship" filled label="Citizenship" hint="Your Citizenship*"
                dense="dense" />
              <q-select class="col" v-model="formData.schoolYear" :options="schoolYear" filled label="School Year"
                hint="Your School Year *" dense="dense" :rules="[(val) => !!val]" />
              <q-select class="col" v-model="formData.semester" :options="semester" filled label="Semester"
                hint="Your School Semester *" dense="dense" :rules="[(val) => !!val]" />
            </div>
            <q-separator />
            <q-btn label="Submit Admission Form" color="primary" type="submit" />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { db, auth } from '../boot/firebase'
import { collection, addDoc } from "firebase/firestore";
import { useQuasar } from 'quasar';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";


const $q = useQuasar()
const router = useRouter()

const selectedDepartment = ref('')
const selectedYearLevel = ref('')
const programChoices = ref([])
const yearLevels = ref([])
const selectedProgam = ref('')

const formData = reactive({
  lastName: '',
  firstName: '',
  middleName: '',
  suffix: '',
  birthday: '',
  email: '',
  fbAccount: '',
  countryCode: '',
  mobileNumber: '',
  telephoneNumber: '',
  classification: '',
  department: '',
  program: '',
  lastSchoolAttended: '',
  schoolAddress: '',
  schoolType: '',
  yearLevel: '',
  citizenship: '',
  schoolYear: '',
  semester: '',
  isVerified: false
})

const countryCodes = [
  "+63 Philippines",
  "+1 United States",
  "+44 United Kingdom",
  "+61 Australia",
  "+81 Japan",
  "+86 China",
  "+91 India",
  "+82 South Korea",
  "+65 Singapore",
  "+1 Canada",
  "+33 France",
  "+49 Germany",
  "+39 Italy",
  "+34 Spain",
  "+7 Russia",
  "+55 Brazil",
  "+966 Saudi Arabia",
  "+971 United Arab Emirates",
  "+972 Israel",
  "+972 Palestine",
  "+90 Turkey",
  "+20 Egypt",
  "+27 South Africa",
];

const classifiedAs = [
  'NEW', 'TRANSFEREE', '2ND COURSER', 'OTHERS'
]

const department = [
  'K12 SENIOR', 'COLLEGE', 'BASIC ED'
]

const schoolType = [
  'Public', 'Private'
]

const colleges = ref([
  'BSBA - Bachelor of Science in Business Administration',
  'BSIT - Bachelor of Science in Information Technology',
  'BSM - Bachelor of Science in Midwifery',
  'BSTM - Bachelor of Science in Tourism Management',
  'Caregiving - Caregiving Program',
  'CTE - College of Teacher Education',
])

const seniorHighschool = ref([
  'Accountancy, Business, and Management (ABM)',
  'Humanities and Social Sciences (HUMSS)',
  'Science, Technology, Engineering, and Mathematics (STEM)',
  'General Academic Strand (GAS)',
])

const basicEdChoices = ref([
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'
])

const seniorHighChoices = ref([
  'Grade 11', 'Grade 12'
])

const collegeChoices = ref([
  '1st YEAR', '2nd YEAR', '3rd YEAR', '4th YEAR'
])

const elementary = ref([
  'None'
])

const schoolYear = [
  '2022-2023', '2023-2024', '2024-2025'
]

const semester = [
  'First Semester', 'Second Semester', 'Summer'
]

const emailRules = [
  val => !!val || 'Email is required',
  val => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) || 'Invalid email'
];

const getProgramOptions = () => {
  switch (selectedDepartment.value.toUpperCase()) {
    case 'K12 SENIOR':
      programChoices.value = seniorHighschool.value;
      break;
    case 'COLLEGE':
      programChoices.value = colleges.value;
      break;
    case 'BASIC ED':
      programChoices.value = elementary.value;
      break;
    default:
      programChoices.value = [];
  }
};

const getYearLevel = () => {
  switch (selectedDepartment.value.toUpperCase()) {
    case 'K12 SENIOR':
      yearLevels.value = seniorHighChoices.value;
      break;
    case 'COLLEGE':
      yearLevels.value = collegeChoices.value;
      break;
    case 'BASIC ED':
      yearLevels.value = basicEdChoices.value;
      break;
    default:
      yearLevels.value = [];
  }
};

watch(() => selectedDepartment.value, getProgramOptions);
watch(() => selectedDepartment.value, getYearLevel);
watch(selectedDepartment, (newVal) => {
  formData.department = newVal;
});

watch(selectedProgam, (newVal) => {
  formData.program = newVal;
});

watch(selectedYearLevel, (newVal) => {
  formData.yearLevel = newVal;
});

const createMember = async () => {
  try {
    // Register the user using Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, formData.email, "defaultPassword");
    // Send email verification
    await sendEmailVerification(userCredential.user);

    // Add the user data to Firestore
    await addDoc(collection(db, "members"), formData);

    $q.notify({
      type: "positive",
      icon: "thumb_up",
      position: "bottom-right",
      message: "Member added successfully and verification email sent!",
      timeout: 3000
    });

    resetForm(); // Reset the form data
    router.push('/login'); // Redirect to '/login' page

  } catch (error) {
    console.error("Error adding document: ", error);
    $q.notify({
      type: "negative",
      icon: "thumb_down",
      position: "bottom-right",
      message: error.message,
      timeout: 5000
    });
  }
};

const resetForm = () => {
  // Resetting all fields in formData to their initial values
  formData.lastName = '';
  formData.firstName = '';
  formData.middleName = '';
  formData.suffix = '';
  formData.birthday = '';
  formData.email = '';
  formData.fbAccount = '';
  formData.countryCode = '';
  formData.mobileNumber = '';
  formData.telephoneNumber = '';
  formData.classification = '';
  formData.department = '';
  formData.program = '';
  formData.lastSchoolAttended = '';
  formData.schoolAddress = '';
  formData.schoolType = '';
  formData.yearLevel = '';
  formData.citizenship = '';
  formData.schoolYear = '';
  formData.semester = '';

  // Resetting other reactive variables
  selectedDepartment.value = '';
  selectedYearLevel.value = '';
  selectedProgam.value = '';
  // Add any other reactive properties that need resetting
};




</script>

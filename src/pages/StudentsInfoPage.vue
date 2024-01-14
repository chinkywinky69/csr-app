<template>
  <q-page padding>
    <div class="q-mb-md">
      <q-table :rows="verifiedStudents" :columns="columns" row-key="name">
        <template v-slot:top>
          <div class="text-h6 q-mr-md">Verified Students</div>
          <q-input placeholder="search" outlined dense>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn flat icon="person" color="primary" @click="viewDetails(props.row)" />
            <q-btn flat icon="delete" color="red-8" @click="deleteUser(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>

    <div>
      <q-table title="Pending Students" :rows="pendingStudents" :columns="columns" row-key="id">
        <template v-slot:top>
          <div class="text-h6 q-mr-md">Pending Members</div>
          <q-input placeholder="search" outlined dense>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn flat icon="person" color="primary" @click="viewDetails(props.row)" />
            <q-btn flat icon="delete" color="red-8" @click="deleteUser(props.row)" />
            <q-btn flat icon="check" color="green-8" @click="acceptStudent(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <!-- VIEW DETAILS DIALOG -->
    <q-dialog v-model="userDetailsDialog">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">User Details</div>
          <q-space />
          <q-btn icon="close" flat round @click="userDetailsDialog = false" />
        </q-card-section>

        <q-card-section>
          <div><strong>Name:</strong> {{ selectedUser.firstName }} {{ selectedUser.lastName }}</div>
          <div><strong>Middle Name:</strong> {{ selectedUser.middleName }}</div>
          <div><strong>Suffix:</strong> {{ selectedUser.suffix }}</div>
          <div><strong>Birthday:</strong> {{ selectedUser.birthday }}</div>
          <div><strong>Email:</strong> {{ selectedUser.email }}</div>
          <div><strong>Facebook Account:</strong> {{ selectedUser.fbAccount }}</div>
          <div><strong>Country Code:</strong> {{ selectedUser.countryCode }}</div>
          <div><strong>Mobile Number:</strong> {{ selectedUser.mobileNumber }}</div>
          <div><strong>Telephone Number:</strong> {{ selectedUser.telephoneNumber }}</div>
          <div><strong>Classification:</strong> {{ selectedUser.classification }}</div>
          <div><strong>Department:</strong> {{ selectedUser.department }}</div>
          <div><strong>Program:</strong> {{ selectedUser.program }}</div>
          <div><strong>Last School Attended:</strong> {{ selectedUser.lastSchoolAttended }}</div>
          <div><strong>School Address:</strong> {{ selectedUser.schoolAddress }}</div>
          <div><strong>School Type:</strong> {{ selectedUser.schoolType }}</div>
          <div><strong>Year Level:</strong> {{ selectedUser.yearLevel }}</div>
          <div><strong>Citizenship:</strong> {{ selectedUser.citizenship }}</div>
          <div><strong>School Year:</strong> {{ selectedUser.schoolYear }}</div>
          <div><strong>Semester:</strong> {{ selectedUser.semester }}</div>
          <div><strong>Verified:</strong> {{ selectedUser.isVerified }}</div>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, onMounted, reactive, } from 'vue';
import { db } from '../boot/firebase';
import { collection, query, onSnapshot, doc, deleteDoc, where, updateDoc } from 'firebase/firestore';
import { getFullname, getAddress } from 'src/composables/filters'
import { useQuasar, Dialog } from 'quasar';

const $q = useQuasar();
const userDetailsDialog = ref(false);
const selectedUser = reactive({});
const pendingStudents = ref([]);
const verifiedStudents = ref([]);

const columns = [
  { name: 'name', required: true, label: 'Name', format: (val, row) => getFullname(row), align: 'left', field: 'name', sortable: true },
  { name: 'email', label: 'Email', field: 'email', align: 'left', sortable: true },
  { name: 'department', label: 'Department', field: 'department', align: 'left', sortable: true },
  { name: 'program', label: 'Program', field: 'program', align: 'left', align: 'left', sortable: true },
  { name: 'yearLevel', label: 'Year Level', field: 'yearLevel', sortable: true },
  { name: 'action', label: 'Actions', field: 'action', align: 'center', sortable: false },
];

// Example function to fetch data (adjust based on your database structure)
onMounted(() => {
  const q = query(collection(db, "members")); // Adjust with your collection name
  onSnapshot(q, (snapshot) => {
    pendingStudents.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  });
});

// VIEW DETAILS
const viewDetails = (row) => {
  Object.assign(selectedUser, row);
  userDetailsDialog.value = true;
};

//DELETE FUNCTION
const deleteUser = (row) => {
  console.log("Deleting user with ID:", row.id);
  Dialog.create({
    title: 'Confirm Deletion',
    message: 'Are you sure you want to delete this user?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    performDeletion(row);
  }).onCancel(() => {
    console.log('Deletion canceled');
  });
};

const performDeletion = async (row) => {
  try {
    await deleteDoc(doc(db, "members", row.id));
    $q.notify({
      type: "positive",
      message: "User successfully deleted",
    });
    pendingStudents.value = pendingStudents.value.filter(user => user.id !== row.id);
  } catch (error) {
    console.error("Error deleting user: ", error);
    $q.notify({
      type: "negative",
      message: `Error deleting user: ${error.message}`,
    });
  }
};

//ACCEPT STUDENT
const acceptStudent = async (row) => {
  try {
    // Assuming 'isVerified' is the field to indicate if a student is verified
    await updateDoc(doc(db, "members", row.id), {
      isVerified: true
    });

    $q.notify({
      type: "positive",
      message: "Student accepted and verified",
    });

    pendingStudents.value = pendingStudents.value.filter(user => user.id !== row.id);
  } catch (error) {
    console.error("Error accepting student: ", error);
    $q.notify({
      type: "negative",
      message: `Error accepting student ${error.message}`,
    });
  }
};



onMounted(() => {
  const pendingQuery = query(collection(db, "members"), where("isVerified", "==", false));
  onSnapshot(pendingQuery, (snapshot) => {
    pendingStudents.value = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }));
  });

  const verifiedQuery = query(collection(db, "members"), where("isVerified", "==", true));
  onSnapshot(verifiedQuery, (snapshot) => {
    verifiedStudents.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  });
});

</script>


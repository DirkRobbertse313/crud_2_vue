<template>
  <div class="container">
    <div class="class card">
      <div class="card-header">
        <h4>
          Employee
          <router-link to="/employee/create" class="btn btn-primary float-end"
            >Add Employee</router-link
          >
        </h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-if="this.employee.length > 0">
            <tr v-for="(employee, index) in this.employee">
              <td>{{ employee.id }}</td>
              <td>{{ employee.first_name }}</td>
              <td>{{ employee.last_name }}</td>
              <td>{{ employee.email }}</td>
              <td>{{ employee.phone }}</td>
              <td>{{ employee.created_at }}</td>
              <td>
                <router-link
                  :to="`/employee/${employee.id}/edit`"
                  class="btn btn-outline-success btn-sm"
                  >Edit</router-link
                >
                <router-link
                  :to="`/employee/${employee.id}/detail`"
                  class="btn btn-outline-warning btn-sm"
                  >Show</router-link
                >

                <button
                  type="button"
                  @click="deleteEmployee(employee.id)"
                  class="btn btn-outline-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="7">loading...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "employee",
  data() {
    return {
      employee: [],
    };
  },
  mounted() {
    this.getEmployee();
  },
  methods: {
    getEmployee() {
      axios.get("http://127.0.0.1:8000/api/employee").then((res) => {
        this.employee = res.data;
        console.log(this.employee);
      });
    },
    deleteEmployee(employeeId) {
      if (confirm("Are you sure you want to delete this employee?")) {
        axios
          .delete(`http://127.0.0.1:8000/api/employee/${employeeId}`)
          .then((res) => {
            alert(res.data.message);
            this.getEmployee(); // Refresh the employee list after deletion
          })
          .catch((error) => {
            if (error.response) {
              if (error.response.status == 404) {
                alert(error.response.data.message);
              }
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
          });
      }
    },
  },
};
</script>

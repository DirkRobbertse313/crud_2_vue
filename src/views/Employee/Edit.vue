<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Edit Employee</h4>
      </div>
      <div class="card-body">
        <ul
          class="alert alert-danger"
          v-if="Object.keys(this.errorList).length > 0"
        >
          <li
            class="mb-0 ms-3"
            v-for="(error, index) in this.errorList"
            :key="index"
          >
            {{ error[0] }}
          </li>
        </ul>
        <div class="mb-3">
          <label for="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            v-model="model.employee.first_name"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            v-model="model.employee.last_name"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="model.employee.email"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="phone">Phone</label>
          <input
            type="text"
            id="phone"
            v-model="model.employee.phone"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <button
            type="button"
            @click="updateEmployee(employeeId)"
            class="btn btn-primary"
          >
            Submit
          </button>
          <router-link to="/employee">
            <button type="button" class="btn btn-none float-end">
              Go back
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "employeeEdit",
  data() {
    return {
      employeeId: "",
      errorList: {}, // Changed to an empty object
      model: {
        employee: {
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
        },
      },
    };
  },
  mounted() {
    this.employeeId = this.$route.params.id;
    this.getEmployeeData(this.employeeId);
  },
  methods: {
    getEmployeeData(employeeId) {
      axios
        .get(`http://127.0.0.1:8000/api/employee/${employeeId}/edit`)
        .then((res) => {
          this.model.employee = res.data.employee; // Assign data
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status == 404) {
              alert(error.response.data.message);
            }
          }
        });
    },

    updateEmployee(employeeId) {
      axios
        .put(
          `http://127.0.0.1:8000/api/employee/${employeeId}`,
          this.model.employee
        )
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          this.errorList = {};
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 422) {
              this.errorList = error.response.data.errors;
            }
            if (error.response.status == 404) {
              alert(error.response.data.message);
            }
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    },
  },
};
</script>

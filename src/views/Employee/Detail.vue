<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4 class="mb-0">Employee Details</h4>
      </div>
      <div class="card-body">
        <template v-if="employee">
          <div class="mb-3"><strong>ID:</strong> {{ employee.id }}
          </div>
          <div class="mb-3">
            <strong>First Name:</strong> {{ employee.first_name }}
          </div>
          <div class="mb-3">
            <strong>Last Name:</strong> {{ employee.last_name }}
          </div>
          <div class="mb-3"><strong>Email:</strong> {{ employee.email }}
          </div>
          <div class="mb-3"><strong>Phone:</strong> {{ employee.phone }}
          </div>
          <div class="mb-3">
            <strong>Created At:</strong>
            {{ new Date(employee.created_at).toLocaleString() }}
          </div>
        </template>
        <template v-else>
          <p>Loading...</p>
        </template>

        <router-link to="/employee" class="btn btn-primary mt-3"
          >Back to List</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Employee",
  data() {
    return {
      employee: null,
    };
  },
  mounted() {
    // Get employee ID from route params
    const employeeId = this.$route.params.id;
    this.getEmployee(employeeId);
  },
  methods: {
    getEmployee(employeeId) {
      axios
        .get(`http://127.0.0.1:8000/api/employee/${employeeId}`)
        .then((res) => {
          this.employee = res.data;
        })
        .catch((error) => {
          console.error(error);
          // Handle error, e.g., show an alert or redirect
        });
    },
  },
};
</script>

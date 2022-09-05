 <template>
  <div class="q-pa-md">
  <q-table
    class="Ticket-table"
    :rows="this.RaiseTicket"
    :columns="columns"
    :filter="filter"
    :filter-method="customFilter"
    row-key="name"
    flat
      bordered
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn  dense round flat  icon="mode_edit" @click="onEdit(props.row.id)"></q-btn>
        <q-btn  dense round flat  icon="delete"  @click="onDelete(props.row.id)"></q-btn>
      </q-td>
    </template>
    <template v-slot:top>
      <div style="width: 100%" class="row">
        <div class="col-3">
          <q-input dense debounce="400" color="black"
         placeholder="Search" rounded outlined v-model="search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
    </template>
  </q-table>
  </div>
</template>
  

<script>
import axios from "axios";

export default {
  name: "HomePage",
  components: {},
  data() {
    return {
      columns,
      search: "",
      RaiseTicket: [],
    };
  },
  computed: {
    filter() {
      return {
        search: this.search,
      };
    },
  },
  methods: {

    onEdit(id) {
      
      this.$router.push("/EditTicket/" + id);
    },

    async onDelete(id) {

      if(confirm("Are you sure want to delete the ticket"))
      {
      let result = await axios.delete(
        "http://localhost:3000/RaiseTickets/" + id
      );

      console.warn(result.id);
      if(result.id==200)
      {
        this.$route.push({name:'Home'});
      }
      window.location.reload();
      }
      else{
        this.$route.push({name:'Home'});
      }
    },

    customFilter(rows, terms) {
      console.log(terms, rows);
      let lowerSearch = terms.search ? terms.search.toLowerCase() : "";
      const filteredRows = rows.filter((row, i) => {
        let ans = false;
        let s1 = true;
        if (lowerSearch != "") {
          s1 = false;
          let s1_values = Object.values(row, i);
          let s1_lower = s1_values.map((x) => x.toString().toLowerCase());
          for (let val = 0; val < s1_lower.length; val++) {
            if (s1_lower[val].includes(lowerSearch)) {
              s1 = true;
              break;
            }
          }
        }
        ans = false;
        if (s1) {
          ans = true;
        }
        return ans;
      });
      return filteredRows;
    },
  },

  async created() {
    let res = await axios.get("http://localhost:3000/RaiseTickets");
    console.warn(res);
    this.RaiseTicket = res.data;
  },
};

const columns = [
  { name: "TicketNo", label: "Ticket Number", field: "id", align: "center",classes:'bg-grey-3'},
  { name: "UserName", label: "UserName", field: "UserName", align: "center",classes:'bg-grey-3' },
  { name: "  Title ", label: "Title", field: "Title", align: "center",classes:'bg-grey-3' },
  { name: " status ", label: "Status", field: "status", align: "center",classes:'bg-grey-3' },
  { name: "  Date  ", label: "Date", field: "Date", align: "center",classes:'bg-grey-3' },
  { name: "actions", label: "Actions", align: "center" ,classes:'bg-grey-3'},
];
</script>

<style lang="sass">
.Ticket-table
  height: 500px
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: $teal-7
  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 1
    color: $dark salmon
    font-size: 18px

    td:first-child
    background-color:#646767

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px 
</style>

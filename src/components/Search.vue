<template>
  <div id='search' class='search'>
    <h3>
      Search Roomies
    </h3>
    <input
        class='search_input'
        placeholder='Naam, studie, plaats...'
        name='search_input'
        type='text'
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = 'Naam, studie, plaats...'" />
    <div class='search-results-container'>
        <ul>
          <li v-for='bla in message' :key='bla'>
            <img src="../assets/sad_pepe.png">
            <div>
              {{ bla }}
            </div>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      message: ['bla', 'foo', 'bar']
    }
  }
}
</script>

<style scoped>
  input {

    width: 20%;
    height: 30px;
    outline: 0;
    border: 0;
    border-bottom: 1px solid #42b983;
    padding-left: 5px;
  }
  input:focus {
    outline: 0;
    border: 0;
    border-bottom: 1px solid #42b983;
    padding-left: 5px;
  }
  input::-webkit-input-placeholder{
    text-align: left;
    line-height: 1em;
  }
  input:focus ~ .label,
  input:not(:focus):valid ~ .label{
    top: 10px;
    bottom: 5px;
    left: 20px;
    font-size: 12px;
  }
  .label {
    position: absolute;
    pointer-events: none;
    left: 20px;
    top: 18px;
    transition: 0.2s ease all;
  }
  ul {
    list-style-type: none;
    padding: 0;
    width: 20%;
    position: absolute;
  }
  li {
    height: 40px;
    text-align: center;
    vertical-align:middle;
    display: flex;
    justify-content: center; /* align horizontal */
    align-items: center; /* align vertical */
  }
  img {
    height: 30px;
    width: 30px;
  }
  .search-result-container {
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center; /* align horizontal */
  }
</style>

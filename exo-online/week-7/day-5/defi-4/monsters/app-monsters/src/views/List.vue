<template>
	<div>
		<button class="btn btn-primary float-right btn-top" @click="reloadList">Reload</button>
         
        <h1 class="title">Monsters List</h1>

        <div class="clearfix"></div>

        <h2 v-show="!bcConnected">Not connect to the blockchain: please wait.</h2>

        <h2 v-show="(isLoading && bcConnected)">Loading...</h2>

        <table class="table table-striped" v-show="!isLoading">
            <thead class="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Monster DNA</th> 
                    <th>Image</th>                   
                    <th>Status</th>                     
                    <th>Created At</th>                   
                </tr>
            </thead>
            <tbody>
                <tr v-for="monster in monsters">
                    <td>{{ monster[0] }}</td>
                    <td>{{ monster[1].toNumber() }}</td>
                    <td><img :src="'https://robohash.org/'+monster[1].toNumber()+'?set=set2&size=150x150'" width="150" height="150"/></td>
                    <td>{{ monster[2] }}</td>
                    <td>{{ toDate(monster[4].toNumber() ) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    // importing common function
    import mixin from '../libs/mixinViews';
    
    /**
     * List view component: this component shows list of the registered users
     * and their statuses.
     */
    export default {
        mixins: [mixin],
        data() {
            return {
                monsters: [], // array that stores all the registered users
                isLoading: true, // true when the user list is loading form the blockchain
                bcConnected: false, // blockchain is connected ()
                tmoConn: null, // contain the intervalID given by setInterval
            }
        },

        methods: {
            /**
             * Get the list of the registered users once the connection to the
             * blockchain is established.
             */
            getMonstersList() {
                if (this.blockchainIsConnected()) {
                    // it shows the loading message
                    this.isLoading = true

                    // stopping the interval
                    clearInterval(this.tmoConn)

                    // getting all the users from the blockchain
                    this.getAllMonsters(monsterProfile => {
                        this.isLoading = false
                        this.monsters.push(monsterProfile)
                        
                    })
                }
            },

            /**
             * It reloads the monsters list.
             */
            reloadList() {
                this.monsters = []

                this.getMonstersList()
            },

			/**
			 * Get all users.
			 */
			getAllMonsters(callback) {
				// getting the total number of users stored in the blockchain
				// calling the method totalUsers from the smart contract
				window.bc.contract().totalMonsters.call((err, total) => {
					var tot = 0
					if (total) tot = total.toNumber()

					if (tot > 0) {
						// getting the user one by one
						for (var i=1; i<tot; i++) {

							window.bc.contract().monsters.call(i, (error, monsterProfile) => {
								callback(monsterProfile)
							})

						} // end for
					}else{
                        this.isLoading = false; 
                    } // end if

				}) // end totalUsers call
			}
        },

        created() {
            // it tries to get the user list from the blockchian once
            // the connection is established
            this.tmoConn = setInterval(() => {
                this.getMonstersList()
            }, 1000)
        }
    }
</script>

<style>
	.btn-top {
		margin-top: 10px;
	}
</style>
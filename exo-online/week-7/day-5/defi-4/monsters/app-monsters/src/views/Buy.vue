<template>
	<div>
		<h1 class="title">Register</h1>

		<div class="row">
			<div class="col-md-3">

	            <div class="form-group">
	                <label for="description">Monster's Name</label>
	                <input class="form-control" placeholder="Enters Monster's Name" type="text" v-model="monsterName">
	            </div>

	             

	            <button class="btn btn-primary" :disabled="disableSubmit" @click="performSubmit">Register</button>
                <strong v-show="submitting">Submitting...</strong>
                <strong v-show="errorSubmit" class="text-danger">Error occurred!</strong>

                <p v-show="successMessage" class="text-success">
                    <strong>You've been registerd!</strong>
                    <br>
                    You will be redirected to the profile page <strong>once the block will be mined!</strong>
                </p>
			</div>
		</div>
	</div>
</template>

<script>
    // importing common function
    import mixin from '../libs/mixinViews';

    export default {
        mixins: [mixin],

    	data() {
    		return {
    			monsterName: '', // variable binded with the input field: name
    			 
                submitting: false, // true once the submit button is pressed
                successMessage: false, // true when the user has been registered successfully

                tmoConn: null, // contain the intervalID given by setInterval
                tmoReg: null, // contain the intervalID given by setInterval
                errorSubmit: false, // it shows the erro message
    		}
    	},

    	computed: {
            /**
             * It disables the submit button when the the name or userStatus are not filled
             * or the submit button is pressed or the connection with the blockchin is
             * not established.
             */
            disableSubmit() {
                return (!this.monsterName.length || this.submitting || !this.blockchainIsConnected())
            }
        },

        methods: {
            /**
             * Perform the registration of the user when the submit button is pressed.
             */
        	performSubmit() {
                this.submitting = true
                this.errorSubmit = false
                this.successMessage = false

                // calling the function registerUser of the smart contract
                
                window.bc.contract().buymonster(
                    this.monsterName,
                     
                    {
                        from: window.bc.web3().eth.coinbase,
                        gas: 800000,
                        value : window.bc.web3().toWei(0.1)
                    },
                    (err, txHash) => {
                        if (err) {
                            console.error(err)
                            this.errorSubmit = true
                        }
                        else {
                            this.successMessage = true

                            // it emits a global event in order to update the top menu bar
                            //Event.$emit('monstersbuy', txHash);

                            // the transaction was submitted and the user will be redirected to the
                            // profile page once the block will be mined
                            this.redirectWhenBlockMined()
                        }
                    }
                )
        	},

             
            /**
             * Once the user submitted his registration this funciton checks every 1000 ms
			 * if the registration is successfully. Once the user is registered he will be
			 * redirected to the profile page.
             *
             * NOTE: in order to check if the user has been registered successfully the
             * function has to check several time because the block can take several
             * minutes to be mined (depending on the the blockchain you are using).
             */
            redirectWhenBlockMined() {
                this.tmoReg = setInterval(() => {
                    if (this.blockchainIsConnected()) {
                        this.$router.push("/")
                    }
                }, 1000)
            }
        },

        created() {
            // it checks every 500ms if the user is registered until the connection is established
            
        }
    }
</script>
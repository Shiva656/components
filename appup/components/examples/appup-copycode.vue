<template>
    <appup-copycode
    :copy="true"
    :share="true"
    copy_data="<script>
(function(u, t, r, a, c, k) {
	k = t.getElementsByTagName('head')[0];
	c = t.createElement('script');
	c.async = 1;
	c.src = r + a;
	c.onload = () => {
		u._ut.init('BalwJa','qa');
u._ut.setEmail('Please enter email');
                u._ut.setUserAttributes({
                    'cdc': 'sdfsdf'
                });
            };
            k.appendChild(c);
        })(window, document, 'https://usertracker.s3-us-west-1.amazonaws.com/lib/', 'usertracker.js');
	</script>"
    ></appup-copycode>
</template>
<script>
export default {
    data(){
        return {

        }
    }
}
</script>
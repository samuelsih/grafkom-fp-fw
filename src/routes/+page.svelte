<script>
    import { goto } from '$app/navigation';
    import { alertMessage } from '../store';

    export let userTiles = 5;

    let msg = "";

    alertMessage.subscribe(m => {
        if(m != "") {
            msg = m
        }
    })
</script>

{#if msg}
    <div class="flex bg-blue-100 rounded-lg p-4">
        <svg class="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <p class="ml-3 text-sm text-blue-700">
        <span class="font-medium">Selamat</span> {msg}
        </p>
</div>
{/if}

<main class="hero min-h-screen bg-base-200">    
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">GRAFIKA KOMPUTER</h1>
        <h5 class="py-6">Kelompok 2</h5>
        <label for="my-modal-4" class="btn btn-primary">Mainkan!!!</label> 
        <!-- <a href="/highscore" class="btn btn-info">High Score</a>  -->
      </div>
    </div>
</main>


<input type="checkbox" id="my-modal-4" class="modal-toggle" />
<label for="my-modal-4" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-lg font-bold">Pilih Tiles</h3>
    <p>Akan ada {userTiles} yang harus dicari</p>
    <input bind:value={userTiles} type="range" min="3" max="10" class="range"/>
    <a class="btn btn-secondary" data-sveltekit-reload href="/play/{userTiles}">Main dengan {userTiles} biji</a>
  </label>
</label>



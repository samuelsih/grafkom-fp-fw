<script>
  import { highScore } from "../../store";


    
</script>

<main class="hero min-h-screen bg-base-200">    
    <div class="hero-content text-center">
      <div class="max-w-md">
        <div class="overflow-x-auto">
            <table class="table w-full">
              <!-- head -->
              <thead>
                <tr>
                  <th></th>
                  <th>Tile</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {#each $highScore as hs, i}
                    <tr>
                    <th>{i + 1}</th>
                    <td>{hs.tiles}</td>
                    <td>{hs.score}</td>
                  </tr>
                {/each}

              </tbody>
            </table>
          </div>
      </div>
    </div>
</main>


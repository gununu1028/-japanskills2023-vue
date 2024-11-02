<template>
    <div class="field">
        <div v-for="(row, rowIndex) in field" :key="rowIndex" class="row">
            <div v-for="(item, colIndex) in row" :key="colIndex" class="object">
                <div v-if="item == 0">
                    <!-- 障害物なし -->
                    <img src="https://gorin2024-material.s3.ap-northeast-1.amazonaws.com/parquet.png" alt="">
                </div>
                <div v-if="item == 1">
                    <!-- 壁 -->
                    <img src="https://gorin2024-material.s3.ap-northeast-1.amazonaws.com/paving.png" alt="壁">
                </div>
                <div v-if="item == 2">
                    <!-- プレイヤー -->
                    <img src="https://gorin2024-material.s3.ap-northeast-1.amazonaws.com/walking.png" alt="プレイヤー">
                </div>
                <div v-if="item == 3">
                    <!-- ブロック -->
                    <img src="https://gorin2024-material.s3.ap-northeast-1.amazonaws.com/block.png" alt="ブロック">
                </div>
                <div v-if="item == 4">
                    <!-- フラッグ -->
                    <img src="https://gorin2024-material.s3.ap-northeast-1.amazonaws.com/flag.png" alt="フラッグ">
                </div>

            </div>
        </div>
    </div>
</template>

<style>
.field {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    background-color: white;
}

.row {
    display: flex;
}

.object {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 1px solid black;
    text-align: center;
}

.object img {
    width: 100%;
}
</style>

<script>
export default {
    data() {
        return {
            field: [],
        };
    },
    mounted() {
        this.loadField();
        window.addEventListener('keydown', this.handleKeyDown);
    },
    methods: {
        async loadField() {
            let token = sessionStorage.getItem('token');
            // BearerトークンでAPIに接続
            let response = await fetch('http://localhost:8085/api/fields?level=1', {
                headers: { Authorization: `Bearer ${token}` },
            });
            let data = await response.json();
            this.field = data.objects;
        },
        handleKeyDown(event) {
            switch (event.key) {
                case 'ArrowUp':
                    // 上に移動
                    this.movePlayer(0, -1);
                    break;
                case 'ArrowRight':
                    // 右に移動
                    this.movePlayer(1, 0);
                    break;
                case 'ArrowDown':
                    // 下に移動
                    this.movePlayer(0, 1);
                    break;
                case 'ArrowLeft':
                    // 左に移動
                    this.movePlayer(-1, 0);
                    break;
            }
        },
        movePlayer(dx, dy) {
            // プレイヤーの現在位置を見つける
            let playerPos = this.findPlayer();
            if (!playerPos) return;

            // 新しい位置を計算
            let newPosX = playerPos.x + dx;
            let newPosY = playerPos.y + dy;

            if (this.isMovable(newPosX, newPosY)) {
                // 新しい位置がフィールド内で、壁や障害物でない場合
                // プレイヤーを新しい位置に移動
                this.field[playerPos.y][playerPos.x] = 0;
                this.field[newPosY][newPosX] = 2;
            } else if (this.field[newPosY][newPosX] === 3) {
                // ブロックに衝突した場合
                let blockNewPosX = newPosX + dx;
                let blockNewPosY = newPosY + dy;
                if (this.isMovable(blockNewPosX, blockNewPosY, true)) {
                    // ブロックを移動させ、プレイヤーも移動
                    this.field[playerPos.y][playerPos.x] = 0;
                    this.field[newPosY][newPosX] = 2;
                    this.field[blockNewPosY][blockNewPosX] = 3;
                }
            }
        },
        isMovable(x, y) {
            // フィールドの範囲内であることを確認
            let withinBounds = y >= 0 && y < this.field.length && x >= 0 && x < this.field[y].length;
            // 壁でないことを確認
            let isNotWall = this.field[y][x] !== 1;
            // ブロックでないことを確認
            let isNotBlock = this.field[y][x] !== 3;

            return withinBounds && isNotWall && isNotBlock;
        },
        findPlayer() {
            for (let y = 0; y < this.field.length; y++) {
                for (let x = 0; x < this.field[y].length; x++) {
                    if (this.field[y][x] === 2) {
                        return { x, y };
                    }
                }
            }
            return null;
        },
    },
};
</script>

<?php

/** @var \App\Model\Przepis[] $przepiss */
/** @var \App\Service\Router $router */

$title = 'Przepis List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Lista przepisów</h1>

    <a href="<?= $router->generatePath('przepis-create') ?>">Create new</a>

    <ul class="index-list">
        <?php foreach ($przepiss as $przepis): ?>
            <li><h3><?= $przepis->getSubject() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('przepis-show', ['id' => $przepis->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('przepis-edit', ['id' => $przepis->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';

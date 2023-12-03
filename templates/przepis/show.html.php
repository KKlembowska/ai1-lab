<?php

/** @var \App\Model\Przepis $przepis */
/** @var \App\Service\Router $router */

$title = "{$przepis->getSubject()} ({$przepis->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $przepis->getSubject() ?></h1>
    <article>
    <p>Składniki:</p>
    <p><?= str_replace(';', '<br>', $przepis->getskladniki()); ?></p>
    <p>Kroki:</p>
    <p><?= str_replace(';', '<br>', $przepis->getkroki()); ?></p>
</article>

    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('przepis-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('przepis-edit', ['id'=> $przepis->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';

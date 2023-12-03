<?php
    /** @var $przepis ?\App\Model\przepis */
?>

<div class="form-group">
    <label for="subject">Subject</label>
    <input type="text" id="subject" name="przepis[subject]" value="<?= $przepis ? $przepis->getSubject() : '' ?>">
</div>

<div class="form-group">
    <label for="skladniki">składniki</label>
    <textarea id="skladniki" name="przepis[skladniki]"><?= $przepis? $przepis->getskladniki() : '' ?></textarea>
</div>
<div class="form-group">
    <label for="kroki">kroki</label>
    <textarea id="kroki" name="przepis[kroki]"><?= $przepis? $przepis->getkroki() : '' ?></textarea>
</div>
<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>
